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

mongoose.connect('mongodb://localhost:27017/mydatabase') // Specify your database name here
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Define schemas and models
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
    console.error('Error retrieving rooms:', err);
    res.status(500).send('Error retrieving rooms');
  }
});

app.post('/create', async (req, res) => {
  let roomName;
  let roomExists = true;

  while (roomExists) {
    roomName = roomIdGenerator.roomIdGenerator();
    const existingRoom = await Room.findOne({ roomName });
    roomExists = !!existingRoom;
  }

  try {
    const newRoom = new Room({ roomName });
    await newRoom.save();
    res.redirect(`/${roomName}`);
  } catch (err) {
    console.error('Error creating room:', err);
    res.status(500).send('Error creating room');
  }
});

app.get('/:roomName/messages', async (req, res) => {
  try {
    const messages = await Message.find({ roomName: req.params.roomName }).sort({ datetime: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).send('Error retrieving messages');
  }
});

app.post('/:roomName/messages', async (req, res) => {
  const { nickname, text } = req.body;
  const newMessage = new Message({ roomName: req.params.roomName, nickname, text });

  try {
    await newMessage.save();
    res.status(201).send('Message sent');
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).send('Error sending message');
  }
});

app.get('/:roomName', roomHandler.getRoom);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message, // Include this in development, remove in production
  });
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
