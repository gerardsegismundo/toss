const express = require('express');
const router = express.Router();
const responseService = require('../../application/responseService');

// @route GET /api/response/request/:request
// @desc Get a response for a user message
router.get('/request/:request', async (req, res) => {
  try {
    const result = await responseService.getResponseByRequest(req.params.request);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route POST /api/response/search-phrasing
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

// @route GET /api/response/entities
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

// @route POST /api/response/keyword
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
</write_to_file>
</execute_command>