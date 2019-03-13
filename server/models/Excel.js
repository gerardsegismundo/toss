const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Excel = mongoose.model(
	'excel',
	new Schema({
		usecase: {},
		utterance: {},
		intent: {},
		entity: {}
	})
);

exports.Excel = Excel;
