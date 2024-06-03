// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.
// const Room = require('../models/room'); // Ensure you have a Room model defined

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


// function getHome(request, response){
//   // do any work you need to do, then
//   response.render('home', {title: 'home'});
// }

module.exports = {
    getHome
};
