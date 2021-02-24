const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/firstProj', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
}).on('error', (error) => {
  console.log('error is:', error);
});

//Init app
const app = express();

app.use(bodyParser.json());

//Bring in models
let Message = require('./models/message');

//Home route
app.get('/', asyncHandler(async (req, res) => {
  const messages = await Message.find({})
      res.send(JSON.stringify(messages))
}));

app.post('/',  async (req, res) => {
  const message = new Message({
  users: req.body.users,
  date: new Date(),
  messages: req.body.messages
})
  const saved = await message.save()
  res.json(saved)
})

//Start server
app.listen(3000, () => {
  console.log('Server started on port 3000... ')
})
