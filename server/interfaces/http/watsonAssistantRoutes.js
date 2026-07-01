const express = require('express');
const router = express.Router();
const watsonService = require('../../application/watsonService');

// ─── Credentials ───────────────────────────────────────────────
router.post('/credentials', async (req, res) => {
  try {
    await watsonService.createCredentials(req.body);
    res.send('CREATED');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/credentials', async (req, res) => {
  const credentials = await watsonService.getCredentials();
  res.send(credentials);
});

router.put('/credentials', async (req, res) => {
  try {
    const result = await watsonService.updateCredentials(req.body);
    if (!result) return res.status(400).send('Updating credentials failed.');
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ─── Workspaces ───────────────────────────────────────────────
router.get('/workspace', async (req, res) => {
  try {
    const result = await watsonService.listWorkspaces();
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/workspace', async (req, res) => {
  try {
    const result = await watsonService.createWorkspace(req.body.workspace);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.patch('/workspace', async (req, res) => {
  try {
    const { workspace_id, name } = req.body;
    const result = await watsonService.updateWorkspace(workspace_id, name);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/workspace/:id', async (req, res) => {
  try {
    await watsonService.deleteWorkspace(req.params.id);
    res.send('Workspace deleted successfully.');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// ─── Intents ──────────────────────────────────────────────────
router.get('/intents/:id', async (req, res) => {
  try {
    const intents = await watsonService.listIntents(req.params.id);
    res.send(intents);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/intents', async (req, res) => {
  try {
    const { workspace_id, intent } = req.query;
    const result = await watsonService.listExamples(workspace_id, intent);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/intents', async (req, res) => {
  try {
    const { workspace_id, intent, description, examples } = req.body;
    const result = await watsonService.createIntent(workspace_id, intent, description, examples);
    res.send(result);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;