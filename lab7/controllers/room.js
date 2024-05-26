// Controller handler to handle functionality in room page

const roomGenerator = require('../util/roomIdGenerator.js');

// Example for handle a get request at '/:roomName' endpoint.
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

  // Room.findOne({ roomName }, (err, room) => {
  //   if (err) {
  //     return response.status(500).send('Error finding room');
  //   }

  //   if (!room) {
  //     return response.status(404).send('Room not found');
  //   }

  //   Message.find({ roomName }).sort({ datetime: 1}).exec((err, messages) => {
  //     if (err) {
  //       return response.status(500).send('Error retrieving messages');
  //     }

  //     response.render('room', {
  //       title: 'Chat Room',
  //       roomName: roomName,
  //       messages: messages,
  //       newRoomId: roomGenerator.roomIdGenerator()
  //     });
  //   });
  // });
  // response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator()});
}

module.exports = {
    getRoom
};
