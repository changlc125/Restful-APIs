const mongoose = require('mongoose');
const { dbURI } = require('../config/config.default');

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// when connection fails
db.on('error', (err) => {
  console.log('Can not connect to MongoDB！', err);
});
// when connection succeds
db.once('open', function () {
  console.log('Successfully connected to MongoDB！');
});

module.exports = {
  User: mongoose.model('User', require('./user')),
  Article: mongoose.model('Article', require('./article')),
};
