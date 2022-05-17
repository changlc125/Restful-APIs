const mongoose = require('mongoose');
const baseModel = require('./base-model');
const md5 = require('../util/md5');
const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    reuqired: true,
  },

  email: {
    type: String,
    reuqired: true,
  },

  password: {
    type: String,
    required: true,
    set: (value) => md5(value),
    // not send password back to client end
    select: false,
  },

  bio: {
    type: String,
    default: null,
  },

  image: {
    type: String,
    default: null,
  },
});
module.exports = userSchema;
