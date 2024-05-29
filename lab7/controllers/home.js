// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.
// const Room = require('../models/room'); // Ensure you have a Room model defined

async function getHome(request, response) {
  // try {
  //   const rooms = await Room.find().select('roomName -_id'); // Select only the roomName field
  //   response.render('home', { title: 'home', rooms });
  // } catch (err) {
  //   response.status(500).send('Error retrieving rooms');
  // }
}

// function getHome(request, response){
//   // do any work you need to do, then
//   response.render('home', {title: 'home'});
// }

module.exports = {
    getHome
};
