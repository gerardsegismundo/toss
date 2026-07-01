const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const credentialsSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  apiKey: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80
  },
  url: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 80
  },
  version: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 15
  },
  workspaceName: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  workspaceId: {
    type: String,
    minlength: 10,
    maxlength: 80
}

module.exports = { Credentials };