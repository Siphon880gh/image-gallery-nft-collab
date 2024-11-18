const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' }); // Load environment variables from .env file

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reprints', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose.connection;
