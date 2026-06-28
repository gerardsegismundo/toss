const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const responseSchema = new Schema({
  entities: [
    {
      type: String,
      required: true,
      minlength: 3,
      lowercase: true
    }
  ],
  content: {
    type: String,
    required: true,
    minlength: 3
  },
  phrasing: {
    type: String,
    required: true,
    minlength: 3
  }
});

const Response = mongoose.model('response', responseSchema);

function validateResponseUpdate(response) {
  const schema = Joi.object({
    _id: Joi.required(),
    __v: Joi.optional(),
    entities: Joi.array().items(
      Joi.string().min(3).max(200).required().lowercase()
    ),
    content: Joi.string().min(3).required(),
    phrasing: Joi.string().min(3).required()
  });
  return schema.validate(response);
}

function validateRequest(request) {
  const schema = Joi.object({
    request: Joi.string().max(50).required()
  });
  return schema.validate(request);
}

function validateNewResponse(data) {
  const schema = Joi.object({
    phrasing: Joi.string().min(3).required(),
    entities: Joi.array().items(Joi.string().min(2).required()).min(1).required(),
    content: Joi.string().min(3).required()
  });
  return schema.validate(data);
}

module.exports = {
  Response,
  validateResponseUpdate,
  validateRequest,
  validateNewResponse
};
</write_to_file>
</execute_command>