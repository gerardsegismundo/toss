const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 1
  },
  role: {
    type: String,
    enum: ['user', 'assistant', 'system'],
    default: 'user'
  },
  conversationId: {
    type: String,
    index: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('message', messageSchema);

function validateMessage(message) {
  const schema = Joi.object({
    content: Joi.string().min(1).max(2000).required(),
    role: Joi.string().valid('user', 'assistant', 'system').optional(),
    conversationId: Joi.string().optional()
  });
  return schema.validate(message);
}

async function getConversation(conversationId, limit = 50) {
  return await Message.find({ conversationId })
    .sort({ date: 1 })
    .limit(limit);
}

async function saveMessage(content, role = 'user', conversationId = null) {
  const msg = new Message({ content, role, conversationId });
  return await msg.save();
}

module.exports = { Message, validateMessage, getConversation, saveMessage };