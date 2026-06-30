const OpenAI = require('openai');
const { Response } = require('../domain/response/Response');

let knowledgeBase = [];
let lastLoaded = 0;
const LOAD_INTERVAL = 60000; // Reload knowledge base every 60s

async function loadKnowledgeBase() {
  try {
    const responses = await Response.find({}).select('phrasing entities content');
    knowledgeBase = responses.map(r => ({
      phrasing: r.phrasing,
      entities: r.entities,
      content: r.content
    }));
    lastLoaded = Date.now();
    console.log(`LLM: Loaded ${knowledgeBase.length} knowledge base items`);
  } catch (err) {
    console.error('LLM: Failed to load knowledge base:', err.message);
  }
}

async function ensureKnowledgeBase() {
  if (knowledgeBase.length === 0 || Date.now() - lastLoaded > LOAD_INTERVAL) {
    await loadKnowledgeBase();
  }
}

function isConfigured() {
  return !!(process.env.OPENAI_API_KEY);
}

function buildSystemPrompt() {
  let prompt = `You are TOSS (Test Organization Support System), an expert QA testing assistant for a software organization. You help team members find information about test artifacts, metrics, automation, and reference materials.

Rules:
- Answer questions concisely and accurately based on the knowledge base below.
- If the question is NOT covered by the knowledge base, use your general software testing knowledge but clearly state that the information is from general knowledge.
- If you don't know the answer, say "I don't have information about that in my knowledge base."
- Keep answers to 2-3 paragraphs max unless asked for detail.
- Format responses with markdown when appropriate (bullet points, bold, etc.).
- Never invent fake knowledge base entries.

Knowledge Base:
`;
  
  knowledgeBase.forEach((item, i) => {
    prompt += `${i + 1}. Question: "${item.phrasing}"\n   Answer: ${item.content}\n   Keywords: ${(item.entities || []).join(', ')}\n\n`;
  });

  if (knowledgeBase.length === 0) {
    prompt += '(No knowledge base entries loaded yet. Use general QA/testing knowledge.)\n';
  }
  
  return prompt;
}

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

async function* getStreamingResponse(message, conversationHistory = []) {
  await ensureKnowledgeBase();
  const client = getClient();
  const systemPrompt = buildSystemPrompt();

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-20),
    { role: 'user', content: message },
  ];

  const stream = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    stream: true,
    max_tokens: 1500,
    temperature: 0.3,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      yield content;
    }
  }
}

async function getResponse(message, conversationHistory = []) {
  await ensureKnowledgeBase();
  const client = getClient();
  const systemPrompt = buildSystemPrompt();

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.slice(-20),
    { role: 'user', content: message },
  ];

  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    max_tokens: 1500,
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
}

module.exports = { getStreamingResponse, getResponse, loadKnowledgeBase, isConfigured };