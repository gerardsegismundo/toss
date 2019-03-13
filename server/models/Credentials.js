const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')

const Credentials = mongoose.model(
	'credentials',
	new Schema({
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
		workspaceId: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 80
		}
	})
)

// function validateCredentials() {}

function validateResponse() {
	const schema = {
		entities: Joi.string().min(3).max(50).required().lowercase(),
		content: Joi.string().min(3).required(),
		phrasing: Joi.string().min(3).required()
	}
}

exports.Credentials = Credentials
