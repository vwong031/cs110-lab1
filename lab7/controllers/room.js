// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');

async function getRoom(request, response){
  const Room = request.app.locals.Room;
  const Message = request.app.locals.Message;
  
  const roomName = request.params.roomName;

  try {
    const room = await Room.findOne({ roomName });

    if (!room) {
      return response.status(404).send('Room not found');
    }

    const messages = await Message.find({ roomName }).sort({ datetime: 1 });

    response.render('room', {
      title: 'Chat Room',
      roomName: roomName,
      messages: messages, 
      newRoomId: roomGenerator.roomIdGenerator()
    });
  } catch (err) {
    response.status(500).send('Error finding room or retrieving messages');
  }

}

module.exports = {
    getRoom
};
