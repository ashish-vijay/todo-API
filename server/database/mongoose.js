const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var dbname = /*'mongodb://tododb:dbtodo87@ds035059.mlab.com:35059/todoapp' || */'mongodb://localhost:27017/todoAPI';

mongoose.connect(dbname, (e) => {
  if (e) throw e;
  console.log('Database connected');
});

module.exports = {
  mongoose
};
