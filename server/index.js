require('dotenv').config();
const express = require('express');
const app = express();
const winston = require('winston');

// Logging setup
require('./startup/logging')();

// Routes
require('./startup/routes')(app);

// Database connection
require('./startup/db')();

const port = process.env.PORT || 5000;

app.listen(port, () => winston.info('Listening on port: ' + port));