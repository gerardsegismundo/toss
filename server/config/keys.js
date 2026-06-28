const dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV === 'production') {
  module.exports = { mongoURI: process.env.MONGO_URI };
} else {
  module.exports = { mongoURI: process.env.MONGO_URI || 'mongodb://localhost/toss' };
}
