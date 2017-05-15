const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var userschema = mongoose.model('user', {
  email: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  }
});

module.exports = {
  userschema
};
