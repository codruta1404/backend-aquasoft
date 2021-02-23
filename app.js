const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/firstProj', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('error is:', error);
});

//Init app
const app = express();

//Bring in models
let Message = require('./models/message');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home route
app.get('/', (req, res) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
       title:'Messages',
       messages: messages
     });
    }
  });
});

//Start server
app.listen(3000, () => {
  console.log('Server started on port 3000... ')
})