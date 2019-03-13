const winston = require('winston');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

module.exports = () => {
	mongoose
		.connect(db, { useNewUrlParser: true, useCreateIndex: true })
		.then(() => winston.info('Connected to MongoDB...'));
};
