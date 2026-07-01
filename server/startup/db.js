const winston = require('winston');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

module.exports = () => {
  mongoose
    .connect(db)
    .then(() => winston.info('Connected to MongoDB...'))
    .catch((err) => winston.error('MongoDB Connection error: ' + err.message));
};