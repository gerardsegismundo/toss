const mongoose = require('mongoose');
const winston = require('winston');

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    winston.info('Connected to MongoDB...');
  } catch (err) {
    winston.error('MongoDB Connection error: ' + err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };