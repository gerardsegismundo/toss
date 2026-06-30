const express = require('express');
const router = express.Router();
const responseService = require('../../application/responseService');
const llmService = require('../../application/llmService');
const { Message } = require('../../models/Message');

// @route POST /chat
// @desc Streaming chat with LLM (SSE)
router.post('/chat', async (req, res) => {
  const { message, conversationId } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  const convId = conversationId || 'anon-' + Date.now();

  // Save user message
  try {
    await Message.create({ content: message, role: 'user', conversationId: convId });
  } catch (err) {
    // Ignore validation errors for short messages
    if (err.name !== 'ValidationError') console.error('Save user msg error:', err);
  }

  // Get conversation history
  const history = await Message.find({ conversationId: convId }).sort({ date: 1 }).limit(20);
  const convHistory = history.map(m => ({ role: m.role, content: m.content }));

  // Set up SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders();

  // Send conversationId
  res.write(`data: ${JSON.stringify({ type: 'meta', conversationId: convId })}\n\n`);

  try {
    const stream = responseService.getStreamingLLMResponse(message, convHistory);
    let fullResponse = '';

    for await (const chunk of stream) {
      if (chunk.type === 'chunk') {
        fullResponse += chunk.text;
        res.write(`data: ${JSON.stringify({ type: 'chunk', text: chunk.text })}\n\n`);
      } else if (chunk.type === 'done') {
        // Save assistant message
        try {
          await Message.create({ content: fullResponse, role: 'assistant', conversationId: convId });
        } catch (err) {
          if (err.name !== 'ValidationError') console.error('Save assistant msg error:', err);
        }
        res.write(`data: ${JSON.stringify({ type: 'done', conversationId: convId })}\n\n`);
      } else if (chunk.type === 'error') {
        res.write(`data: ${JSON.stringify({ type: 'error', text: chunk.text })}\n\n`);
      }
    }
  } catch (err) {
    console.error('Chat streaming error:', err);
    res.write(`data: ${JSON.stringify({ type: 'error', text: err.message })}\n\n`);
  }

  res.end();
});

// @route GET /:request
// @desc Non-streaming fallback response
router.get('/request/:request', async (req, res) => {
  try {
    const result = await responseService.getResponseByRequest(req.params.request);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route POST /search-phrasing
// @desc Get phrasing suggestions
router.post('/search-phrasing', async (req, res) => {
  const { phrasing } = req.body;
  if (!phrasing || typeof phrasing !== 'string') return res.end();

  try {
    const suggestions = await responseService.searchPhrasing(phrasing);
    res.send(suggestions);
  } catch (err) {
    console.error('SEARCH-PHRASING ERROR: ' + err);
    res.status(500).end();
  }
});

// @route GET /entities
// @desc Get entities for a response
router.get('/entities', async (req, res) => {
  try {
    const response = await responseService.getResponseById(req.body.id);
    if (!response) return res.status(400).send('Response not found.');
    res.send({ entities: response.entities });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route POST /keyword
// @desc Add keyword to a response
router.post('/keyword', async (req, res) => {
  try {
    await responseService.addKeyword(req.body.id, req.body.keyword);
    res.status(200).send('Keyword added successfully');
  } catch (err) {
    res.status(400).send('Adding keyword failed.');
  }
});

// @route GET *
// @desc 404 Route
router.get('*', (req, res) => res.end());

module.exports = router;