const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var dbname = process.env.MONGODB_URI || 'mongodb://localhost:27017/todoAPI';

mongoose.connect(dbname, (e) => {
  if (e) throw e;
  console.log('Database connected');
});

module.exports = {
  mongoose
};
