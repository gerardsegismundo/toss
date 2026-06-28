const { Response, validateRequest, validateNewResponse } = require('../domain/response/Response');
const { File } = require('../domain/watson/File');
const { Credentials } = require('../domain/watson/Credentials');
const { sendMessage } = require('../infrastructure/watson/watsonClient');

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
  getResponseByRequest,
  getAllResponses,
  getResponseById,
  createResponse,
  updateResponse,
  deleteResponse,
  searchPhrasing,
  addKeyword
};
</write_to_file>
</execute_command>