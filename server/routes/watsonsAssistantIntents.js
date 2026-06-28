const express = require('express');
const router = express.Router();
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { Credentials } = require('../models/Credentials');

async function getWatsonAssistant() {
  const credentials = await Credentials.findOne({ service: 'assistant' });
  if (!credentials) return null;

  const { apiKey, url, version } = credentials;

  return new AssistantV1({
    authenticator: new IamAuthenticator({ apikey: apiKey }),
    serviceUrl: url,
    version: version || '2019-02-21'
  });
}

// @route GET /:id
// @desc Get list of intents for a workspace
router.get('/:id', async (req, res) => {
  try {
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.status(400).send('Watson credentials not configured.');

    const response = await assistant.listIntents({ workspaceId: req.params.id });
    res.send(response.result.intents);
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

// @route GET /
// @desc Get information about an intent
router.get('/', async (req, res) => {
  try {
    const { workspace_id, intent } = req.query;
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.status(400).send('Watson credentials not configured.');

    const response = await assistant.listExamples({
      workspaceId: workspace_id,
      intent: intent
    });
    res.send(response.result);
  } catch (err) {
    res.send(err.message || err);
  }
});

// @route POST /
// @desc Create an intent
router.post('/', async (req, res) => {
  try {
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.status(400).send('Watson credentials not configured.');

    const { workspace_id, intent, description, examples } = req.body;

    const response = await assistant.createIntent({
      workspaceId: workspace_id,
      intent,
      description,
      examples
    });
    res.send(response.result);
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

module.exports = router;
