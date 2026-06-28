const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Filtered = mongoose.model(
  'filtered',
  new Schema({
    date: {
      type: Date,
      default: Date.now
    },
    phrasing: { type: String, minlength: 3 },
    nouns: {
      proper: [{ type: String, minlength: 2 }],
      common: [{ type: String, lowercase: true }]
    },
    verbs: [{ type: String, lowercase: true }],
    entities: [{ type: String, lowercase: true }]
  })
);

module.exports = { Filtered };
