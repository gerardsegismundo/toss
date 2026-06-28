const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { Credentials } = require('../../domain/watson/Credentials');

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

async function sendMessage(request, workspaceId, apiKey, url, version) {
  const { IamAuthenticator } = require('ibm-watson/auth');
  const AssistantV1 = require('ibm-watson/assistant/v1');

  const assistant = new AssistantV1({
    authenticator: new IamAuthenticator({ apikey: apiKey }),
    serviceUrl: url,
    version: version || '2019-02-21'
  });

  return new Promise((resolve, reject) => {
    assistant.message(
      {
        workspace_id: workspaceId,
        input: { text: request }
      },
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
}

module.exports = { getWatsonAssistant, sendMessage };
</write_to_file>
</execute_command>