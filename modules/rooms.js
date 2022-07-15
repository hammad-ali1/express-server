let rooms = {};
class Room {
  constructor(name, owner) {
    this.name = name;
    this.id = name + owner;
    this.users = [];
    this.owner = owner;
  }
  addUser(user) {
    if (this.users.find((prevUser) => prevUser === user)) {
      //user already added
      return;
    }
    this.users.push(user);
  }
  removeUser(user) {
    this.users = this.users.filter((prevUser) => prevUser._id !== user._id);
  }
}
const createRoom = (name, owner, socket) => {
  let newRoom = new Room(name, owner);
  socket.join(newRoom.id);
  if (rooms[owner]) {
    //if owner rooms array is not empty
    if (rooms[owner].find((prevRoom) => prevRoom.id === newRoom.id)) {
      return { success: false, err: "User already logged into room" };
    } else {
      rooms[owner].push(newRoom);
      return { success: true, roomId: newRoom.id };
    }
  } else {
    rooms[owner] = new Array(newRoom);
    return { success: true, roomId: newRoom.id };
  }
};

const getAllRooms = () => {
  return rooms;
};

const getRooms = (owner) => {
  return rooms[owner];
};

const getRoom = (roomName, userId) => {
  const userRooms = rooms[userId];
  if (userRooms) {
    const roomFound = userRooms.find((room) => room.name === roomName);
    if (roomFound) {
      return { success: true, room: roomFound };
    } else {
      return { success: false, err: "Incorect room name" };
    }
  } else {
    return { success: false, err: "User does not have any rooms" };
  }
};
module.exports = {
  createRoom,
  getAllRooms,
  getRooms,
  getRoom,
};
