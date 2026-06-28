const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const excelRoutes = require('../interfaces/http/excelRoutes');
const responseRoutes = require('../interfaces/http/responseRoutes');
const responseDataRoutes = require('../interfaces/http/responseDataRoutes');
const filteredRoutes = require('../interfaces/http/filteredRoutes');
const watsonAssistantRoutes = require('../interfaces/http/watsonAssistantRoutes');
const errorHandler = require('../interfaces/http/middleware/errorHandler');

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use('/api/excel', excelRoutes);
  app.use('/api/filtered', filteredRoutes);
  app.use('/api/response', responseRoutes);
  app.use('/api/response-data', responseDataRoutes);
  app.use('/api/watson-assistant', watsonAssistantRoutes);

  app.use(errorHandler);
};