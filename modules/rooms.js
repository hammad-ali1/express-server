let rooms = {};
const createRoom = (name, socket) => {
  socket.join(name + socket.id);
  rooms[socket.id] = name + socket.id;
  socket.rooms.push(name + socket.id);
};
