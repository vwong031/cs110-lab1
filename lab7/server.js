// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const roomIdGenerator = require('./util/roomIdGenerator.js');

mongoose.connect('mongodb://localhost:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set up stylesheets route

// TODO: Add server side code
const messageSchema = new mongoose.Schema({
  roomName: String,
  nickname: String,
  text: String,
  datetime: { type: Date, default: Date.now }
});

const roomSchema = new mongoose.Schema({
  roomName: { type: String, unique: true }
});

const Message = mongoose.model('Message', messageSchema);
const Room = mongoose.model('Room', roomSchema);

app.locals.Message = Message;
app.locals.Room = Room;

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);

app.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().select('roomName -_id'); // Select only the roomName field
    res.json(rooms);
  } catch (err) {
    res.status(500).send('Error retrieving rooms');
  }
});


app.post('/create', async(req, res) => {
  let roomName;
  let roomExists = true;

  // const roomName = req.body.roomName || roomIdGenerator.roomIdGenerator();

  while (roomExists) {
    roomName = roomIdGenerator.roomIdGenerator();
    const existingRoom = await Room.findOne({ roomName });
    roomExists = !!existingRoom;
  }
  
  try {
    const newRoom = new Room({ roomName });
    await newRoom.save();
    res.redirect(`/${roomName}`);
  } catch(err) {
    res.status(500).send('Error creating room');
  }
});

app.get('/:roomName/messages', async(req, res) => {
  try {
    const messages = await Message.find({ roomName: req.params.roomName }).sort({ datetime: 1});
    res.json(messages);
  }
  catch(err) {
    res.status(500).send('Error retrieving messages');
  }
});

app.post('/:roomName/messages', async(req, res) => {
  const { nickname, text } = req.body;
  const newMessage = new Message({ roomName: req.params.roomName, nickname, text });
  try {
    await newMessage.save();
    res.status(201).send('Message sent');
  } catch(err) {
    res.status(500).send('Error sending message');
  }
});

app.get('/:roomName', roomHandler.getRoom);

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
