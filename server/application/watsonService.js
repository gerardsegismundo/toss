const { Credentials } = require('../domain/watson/Credentials');
const { getWatsonAssistant } = require('../infrastructure/watson/watsonClient');

async function getCredentials() {
  const credentials = await Credentials.findOne({ service: 'assistant' });
  return credentials || '';
}

async function createCredentials(data) {
  const newCredentials = {
    service: 'assistant',
    apiKey: data.apiKey,
    url: data.url,
    version: data.version
  };
  return await new Credentials(newCredentials).save();
}

async function updateCredentials(data) {
  const { apiKey, url, workspaceId, workspaceName, version } = data;
  const payload = { apiKey, url, version, workspaceId, workspaceName };
  return await Credentials.updateOne(
    { service: 'assistant' },
    { $set: payload }
  );
}

async function listWorkspaces() {
  const assistant = await getWatsonAssistant();
  if (!assistant) return null;
  const response = await assistant.listWorkspaces();
  return response.result;
}

async function createWorkspace(name) {
  const assistant = await getWatsonAssistant();
  if (!assistant) throw new Error('Watson credentials not configured.');
  const response = await assistant.createWorkspace({ name, description: '' });
  return response.result;
}

async function updateWorkspace(workspaceId, name) {
  const assistant = await getWatsonAssistant();
  if (!assistant) throw new Error('Watson credentials not configured.');
  const response = await assistant.updateWorkspace({ workspaceId, name });
  return response.result;
}

async function deleteWorkspace(workspaceId) {
  const assistant = await getWatsonAssistant();
  if (!assistant) throw new Error('Watson credentials not configured.');
  await assistant.deleteWorkspace({ workspaceId });
}

async function listIntents(workspaceId) {
  const assistant = await getWatsonAssistant();
  if (!assistant) throw new Error('Watson credentials not configured.');
  const response = await assistant.listIntents({ workspaceId });
  return response.result.intents;
}

async function listExamples(workspaceId, intent) {
  const assistant = await getWatsonAssistant();
  if (!assistant) throw new Error('Watson credentials not configured.');
  const response = await assistant.listExamples({ workspaceId, intent });
  return response.result;
}

async function createIntent(workspaceId, intent, description, examples) {
  const assistant = await getWatsonAssistant();
  if (!assistant) throw new Error('Watson credentials not configured.');
  const response = await assistant.createIntent({
    workspaceId,
    intent,
    description,
    examples
  });
  return response.result;
}

module.exports = {
  getCredentials,
  createCredentials,
  updateCredentials,
  listWorkspaces,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  listIntents,
  listExamples,
  createIntent
};
</write_to_file>
</execute_command>