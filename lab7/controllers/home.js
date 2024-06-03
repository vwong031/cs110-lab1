// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.

async function getHome(request, response) {
  const Room = request.app.locals.Room;
  try {
    const rooms = await Room.find().select('roomName -_id'); 
    const roomNames = rooms.map(room => room.roomName);
    response.render('home', { title: 'home', rooms: roomNames }); 
  } catch (err) {
    response.status(500).send('Error retrieving rooms');
  }
}



module.exports = {
    getHome
};
