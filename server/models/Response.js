const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

const Response = mongoose.model(
	'response',
	new Schema({
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
			minlegth: 3
		},
		phrasing: {
			type: String,
			required: true,
			minlength: 3
		}
	})
)

function validateResponseUpd(response) {
	const schema = {
		_id: Joi.required(),
		__v: Joi.required(),
		entities: Joi.array().items(Joi.string().min(3).max(50).required().lowercase()),
		content: Joi.string().min(3).required(),
		phrasing: Joi.string().min(3).required()
	}

	return Joi.validate(response, schema)
}

function validateRequest(request) {
	const schema = {
		request: Joi.string().max(50).required()
	}

	return Joi.validate(request, schema)
}

exports.validateRequest = validateRequest
exports.validateResponseUpd = validateResponseUpd
exports.Response = Response
