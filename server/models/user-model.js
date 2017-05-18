const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
    unique: true,
    validate: {
      isAsync: true,
      validator: validator.isEmail,
      message: '{VALUE} is not valid'
  }
},
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
  var userschema = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return Promise.reject();
  }
  return userschema.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var userschema = mongoose.model('user', UserSchema);

module.exports = {
  userschema
};
