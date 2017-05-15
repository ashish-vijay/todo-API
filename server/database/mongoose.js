const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/todoAPI', (e) => {
  if (e) throw e;
  console.log('Database connected');
});

module.exports = {
  mongoose
};
