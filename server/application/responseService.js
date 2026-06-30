const { Response, validateRequest, validateNewResponse } = require('../domain/response/Response');
const { File } = require('../domain/watson/File');
const { Credentials } = require('../domain/watson/Credentials');
const { sendMessage } = require('../infrastructure/watson/watsonClient');
const llmService = require('./llmService');

// ─── LLM-Powered Response (Primary) ─────────────────────────

async function getLLMResponse(message) {
  if (llmService.isConfigured()) {
    try {
      const response = await llmService.getResponse(message, []);
      if (response) return { text: response };
    } catch (err) {
      console.error('LLM response failed, falling back:', err.message);
    }
  }
  // Fall back to traditional matching
  return getResponseByRequest(message);
}

async function* getStreamingLLMResponse(message, conversationHistory = []) {
  if (llmService.isConfigured()) {
    try {
      const stream = llmService.getStreamingResponse(message, conversationHistory);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        yield { type: 'chunk', text: chunk };
      }
      yield { type: 'done', fullText: fullResponse };
      return;
    } catch (err) {
      console.error('LLM streaming failed:', err.message);
      yield { type: 'error', text: err.message };
    }
  }
  // Fall back: non-streaming response
  const response = await getResponseByRequest(message);
  yield { type: 'chunk', text: response.text || JSON.stringify(response) };
  yield { type: 'done', fullText: response.text || JSON.stringify(response) };
}

// ─── Traditional Response Matching ──────────────────────────

async function getResponseByRequest(request) {
  const messageArray = request.trim().split(' ');

  // Try local response first
  const localResponse = await Response.findOne({ entities: { $in: messageArray } });

  if (localResponse) {
    const { entities } = localResponse;
    let matchCount = 0;

    entities.forEach((entity) => {
      if (messageArray.includes(entity)) {
        matchCount += 1;
      }
    });

    const requiredEntity = localResponse.entities.length;
    if (matchCount >= requiredEntity) {
      const mongoAccess = await File.findOne({ intent: localResponse.content });
      if (mongoAccess) {
        return mongoAccess.tags;
      }
      return { text: localResponse.content };
    }
  }

  // Fall back to Watson Assistant
  const credentials = await Credentials.findOne({ service: 'assistant' });
  if (!credentials) {
    return { text: "I didn't understand. You can try rephrasing." };
  }

  try {
    const data = await sendMessage(
      request,
      credentials.workspaceId,
      credentials.apiKey,
      credentials.url,
      credentials.version
    );

    const text = data.output.text[0];
    if (!text || text === "I didn't understand. You can try rephrasing.") {
      return { text: "I didn't understand. You can try rephrasing." };
    }

    const fileData = await File.findOne({ intent: text });
    if (!fileData) {
      return { text: 'Not available.' };
    }
    return fileData.tags;
  } catch (err) {
    console.error('Watson error:', err);
    return { text: "I didn't understand. You can try rephrasing." };
  }
}

async function getAllResponses() {
  return await Response.find();
}

async function getResponseById(id) {
  return await Response.findById(id);
}

async function createResponse(data) {
  const { error } = validateNewResponse(data);
  if (error) throw new Error(error.details[0].message);

  const newResponse = {
    phrasing: data.phrasing,
    entities: data.entities,
    content: data.content
  };

  return await new Response(newResponse).save();
}

async function updateResponse(data) {
  const { _id, phrasing, entities, content } = data;
  const payload = { phrasing, entities, content };
  return await Response.updateOne({ _id }, { $set: payload });
}

async function deleteResponse(id) {
  return await Response.deleteOne({ _id: id });
}

async function searchPhrasing(phrasing) {
  const phrasings = phrasing.trim().split(' ');
  return await Response.find({ entities: { $in: phrasings.map((e) => RegExp(e)) } })
    .sort('phrasing')
    .select('phrasing')
    .limit(5);
}

async function addKeyword(id, keyword) {
  return await Response.updateOne(
    { _id: id },
    { $push: { entities: keyword } }
  );
}

module.exports = {
  getLLMResponse,
  getStreamingLLMResponse,
  getResponseByRequest,
  getAllResponses,
  getResponseById,
  createResponse,
  updateResponse,
  deleteResponse,
  searchPhrasing,
  addKeyword
};