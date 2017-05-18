const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var todoschema = mongoose.model('todo', {
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

module.exports = {
  todoschema
};
