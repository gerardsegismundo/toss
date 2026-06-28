const express = require('express');
const router = express.Router();
const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

async function getWatsonAssistant() {
  const { Credentials } = require('../models/Credentials');
  const credentials = await Credentials.findOne({ service: 'assistant' });
  if (!credentials) return null;

  const { apiKey, url, version } = credentials;

  return new AssistantV1({
    authenticator: new IamAuthenticator({ apikey: apiKey }),
    serviceUrl: url,
    version: version || '2019-02-21'
  });
}

// @route GET /
// @desc GET workspaces (skills)
router.get('/', async (req, res) => {
  try {
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.send(null);

    const response = await assistant.listWorkspaces();
    res.send(response.result);
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

// @route POST /
// @desc CREATE workspace (skill)
router.post('/', async (req, res) => {
  try {
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.status(400).send('Watson credentials not configured.');

    const name = req.body.workspace;
    const response = await assistant.createWorkspace({
      name,
      description: ''
    });
    res.send(response.result);
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

// @route PATCH /
// @desc UPDATE workspace (skill)
router.patch('/', async (req, res) => {
  try {
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.status(400).send('Watson credentials not configured.');

    const { workspace_id, name } = req.body;
    const response = await assistant.updateWorkspace({
      workspaceId: workspace_id,
      name
    });
    res.send(response.result);
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

// @route DELETE /:id
// @desc DELETE workspace (skill)
router.delete('/:id', async (req, res) => {
  try {
    const assistant = await getWatsonAssistant();
    if (!assistant) return res.status(400).send('Watson credentials not configured.');

    await assistant.deleteWorkspace({
      workspaceId: req.params.id
    });
    res.send('Workspace deleted successfully.');
  } catch (err) {
    res.status(400).send(err.message || err);
  }
});

module.exports = router;
