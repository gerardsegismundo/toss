const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi-browser');

const Message = mongoose.model(
	'message',
	new Schema({
		content: {
			type: String,
			required: true,
			minlength: 3
		},
		date: {
			type: Date,
			default: Date.now
		}
	})
);

function validateMessage(message) {
	const schema = {
		content: Joi.string().min(3).max(100).required()
	};

	return Joi.validate(message, schema);
}

exports.Message = Message;
exports.validateMessage = validateMessage;
