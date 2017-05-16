const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var todoschema = mongoose.model('todo', {
  text: {
    type: String,
    required: true,
    trim: true,
    minlength:
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number
  }
});

module.exports = {
  todoschema
};
