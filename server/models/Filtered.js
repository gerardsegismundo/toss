const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi-browser');

const Filtered = mongoose.model(
	'filtered',
	new Schema({
		date: {
			type: Date,
			default: Date.now
		},
		phrasing: { type: String, minlength: 3 },
		nouns: {
			proper: [ { type: String, minlegth: 2 } ],
			common: [ { type: String, lowercase: true } ]
		},
		verbs: [ { type: String, lowercase: true } ],
		entities: [ { type: String, lowecase: true } ]
	})
);

exports.Filtered = Filtered;
