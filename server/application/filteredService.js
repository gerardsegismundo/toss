const { Filtered } = require('../domain/filtered/Filtered');
const wordPOS = require('wordpos');
const wordpos = new wordPOS();

async function getAllFiltered() {
  return await Filtered.find({}).sort({ date: 'desc' });
}

async function deleteFiltered(id) {
  return await Filtered.deleteOne({ _id: id });
}

async function deleteAllFiltered() {
  return await Filtered.deleteMany({});
}

async function getEntitiesFromRequest(request) {
  const messageArray = request.trim().split(' ');
  const properNouns = [];

  messageArray.forEach((word) => {
    if (/[A-Z]/.test(word[0])) {
      properNouns.push(word);
    }
  });

  let commonNouns = [];
  await wordpos.getNouns(request, (noun) => {
    commonNouns = [...noun];
  });

  let verbs = [];
  await wordpos.getVerbs(request, (verb) => {
    verbs = [...verb];
  });

  let entities = [...properNouns, ...commonNouns, ...verbs].map((word) =>
    word.toLowerCase()
  );
  entities = [...new Set(entities)];

  const filtered = {
    phrasing: request,
    nouns: {
      proper: properNouns,
      common: commonNouns
    },
    verbs,
    entities
  };

  await new Filtered(filtered).save();
  return filtered;
}

module.exports = {
  getAllFiltered,
  deleteFiltered,
  deleteAllFiltered,
  getEntitiesFromRequest
};