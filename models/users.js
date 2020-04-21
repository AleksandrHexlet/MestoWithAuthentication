const mongoose = require('mongoose');
// eslint-disable-next-line import/no-unresolved
const validator = require('validator');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
});

module.exports = mongoose.model('user', userSchema);


// eslint-disable-next-line max-len
// match: /http(s)?:\/\/?(([0-9]{0,3}\.[0-5]{0,3}\.[0-5]{0,3}\.)([0-2]?[0-5]?[0-5]?)|(www.)?\w+(\.|\/)+[A-Za-z]{2,})(:6[0-5]{1,4})?(:[1-5][0-9]{1,4}|:[0-9]{2,4})?#?/,
