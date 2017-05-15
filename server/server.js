const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./database/mongoose');
var {userschema} = require('./models/user-model');
var {todoschema} = require('./models/todo-model.js');

var app = express();
//var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new todoschema({
    text: req.body.text
  });

  todo.save().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.status(400).send(err);
  });
});


app.listen(3000, (e) => {
  if(e) throw e;
  console.log('Server is listenting');
});
