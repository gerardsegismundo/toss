const winston = require('winston');

function errorHandler(err, req, res, next) {
  winston.error(err.message, err);
  res.status(500).json({ error: 'Something went wrong!' });
}

module.exports = errorHandler;
</write_to_file>
</execute_command>