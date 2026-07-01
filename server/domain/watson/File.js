const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  tags: {
    title: { type: String },
    imageURL: { type: String },
    link: { type: String },
    text: { type: String }
  },
  intent: {
    type: String,
    required: true
}

module.exports = { File };