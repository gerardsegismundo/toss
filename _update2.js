const fs = require('fs');
const path = require('path');
const root = 'c:/Users/gerar/Documents/projects/toss';

// 4. Update server/config/keys.js
const keysContent = `const dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI: process.env.MONGO_URI };
} else {
  module.exports = { mongoURI: process.env.MONGO_URI || 'mongodb://localhost/toss' };
}
`;
fs.writeFileSync(path.join(root, 'server', 'config', 'keys.js'), keysContent);

// 5. Update server/startup/logging.js
const loggingContent = `const winston = require('winston');
require('express-async-errors');

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));

  if (process.env.NODE_ENV !== 'production') {
    winston.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }));
  }
};
`;
fs.writeFileSync(path.join(root, 'server', 'startup', 'logging.js'), loggingContent);

// 6. Update server/startup/db.js
const dbContent = `const winston = require('winston');
const mongoose = require('mongoose');
const db = require('../config/keys').mongoURI;

module.exports = () => {
  mongoose
    .connect(db)
    .then(() => winston.info('Connected to MongoDB...'))
    .catch((err) => winston.error('MongoDB Connection error: ' + err.message));
};
`;
fs.writeFileSync(path.join(root, 'server', 'startup', 'db.js'), dbContent);

// 7. Update server/startup/routes.js
const routesContent = `const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const excel = require('../routes/excel');
const response = require('../routes/response');
const responseData = require('../routes/responseData');
const filtered = require('../routes/filtered');
const watsonAssistantIntents = require('../routes/watsonsAssistantIntents');
const watsonAssistantCredentials = require('../routes/watsonAssistantCredentials');
const watsonAssistantWorkspace = require('../routes/watsonAssistantWorkspace');

module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use('/api/excel', excel);
  app.use('/api/filtered', filtered);
  app.use('/api/response', response);
  app.use('/api/response-data', responseData);
  app.use('/api/watson-assistant/intents', watsonAssistantIntents);
  app.use('/api/watson-assistant/workspace', watsonAssistantWorkspace);
  app.use('/api/watson-assistant/credentials', watsonAssistantCredentials);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });
};
`;
fs.writeFileSync(path.join(root, 'server', 'startup', 'routes.js'), routesContent);

// 8. Update server/index.js
const indexContent = `require('dotenv').config();
const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db');

const port = process.env.PORT || 5000;

app.listen(port, () => winston.info('Listening on port: ' + port));
`;
fs.writeFileSync(path.join(root, 'server', 'index.js'), indexContent);

// 9. Delete hardcoded credentials file (assistant.js with hardcoded API keys)
const assistantPath = path.join(root, 'server', 'helper', 'assistant.js');
if (fs.existsSync(assistantPath)) {
  fs.unlinkSync(assistantPath);
}

// 10. Delete empty/unused files
const emptyFiles = [
  path.join(root, 'server', 'routes', 'phrasing.js'),
  path.join(root, 'server', 'models', 'Workspace.js'),
];
emptyFiles.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8').trim();
    if (!content) fs.unlinkSync(f);
  }
});

console.log('Part 2 done - server files updated');
