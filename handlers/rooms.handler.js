module.exports = function (io, socket) {
  //get users in a specific room
  const getRoomUsers = (roomId) => {
    if (!roomId || !io.sockets.adapter.rooms.get(roomId)) return []; //if room id is invalid or no sockets exist
    const socketIds = Array.from(io.sockets.adapter.rooms.get(roomId));
    if (socketIds) {
      const users = socketIds.map((id) => io.sockets.sockets.get(id).user);
      console.log(users);
      return users;
    } else {
      return [];
    }
  };
  //join a room
  socket.on("join-room", ({ roomId }, callback) => {
    console.log("Room request");
    socket.join(roomId);
    socket.user._doc.rooms.push(roomId);
    io.to(roomId).emit("refresh-room-users", getRoomUsers(roomId));
    // callback({ msg: "Success" });
  });
  //leave a room
  socket.on("leave-room", (roomId) => {
    console.log("Leaving Room of id " + roomId);
    socket.leave(roomId);
    socket.user._doc.rooms = socket.user._doc.rooms.filter(
      (room) => room !== roomId
    );
    io.to(roomId).emit("refresh-room-users", getRoomUsers(roomId));
  });
  //send message in a room
  socket.on("room-message", ({ msg, roomId }) => {
    io.to(roomId).emit("room-message", msg);
  });
  //send invite to a user
  socket.on("room-invite", ({ socketId, roomId }) => {
    console.log("Room invite ");
    console.log(socketId);
    console.log(roomId);
    const socketToInvite = io.sockets.sockets.get(socketId);
    if (socketToInvite) {
      socketToInvite.join(roomId);
      socketToInvite.user._doc.rooms.push(roomId);
      socketToInvite.emit("room-invite", { roomId });
      io.to(roomId).emit("refresh-room-users", getRoomUsers(roomId));
    }
  });
  socket.on("disconnect", () => {
    console.log("Leaving All Rooms");
    console.log(socket.user._doc.rooms);
    const roomsToLeave = socket.user._doc.rooms;
    roomsToLeave.forEach((room) => {
      io.to(room).emit("refresh-room-users", getRoomUsers(room));
    });
  });
  //get users in a room
  // socket.on("fetch-room-users", ({ roomId }) => {
  //   console.log("Fetching users of room  " + roomId);
  //   io.to(roomId).emit("refresh-room-users", getRoomUsers(roomId));
  // });
};
