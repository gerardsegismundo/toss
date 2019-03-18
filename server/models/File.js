const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi-browser')

const File = mongoose.model(
	'file',
	new Schema({
		tags: {
			title: {
				type: String
			},
			imageURL: {
				type: String
			},
			link: {
				type: String
			},
			text: {
				type: String
			}
		},
		intent: {
			type: String,
			required: true
		}
	})
)

exports.File = File
