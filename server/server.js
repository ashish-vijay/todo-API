const express = require('express');
const bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');

var {mongoose} = require('./database/mongoose');
var {userschema} = require('./models/user-model');
var {todoschema} = require('./models/todo-model.js');

var app = express();
var port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
  todoschema.find().then((todos) => {
    res.send({todos});
  }, (e) => {
      res.status(400).send(err);
    });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send('Invalid id');
  }
  todoschema.findById(id).then((todos) => {
      if(!todos) {
        return res.status(404).send();
      }
      res.status(200).send(JSON.stringify(todos, undefined, 2));
    }).catch((err) => {
      res.status(400).send();
    });
});


app.listen(port, (e) => {
  if(e) {
    return console.log('Failed to listen to server');
  }
  console.log('Server is listenting');
});
