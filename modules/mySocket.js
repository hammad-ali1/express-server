const { protectSocket } = require("../middleware/auth.middleware");

module.exports = function (server) {
  const io = require("socket.io")(server, { cors: { origin: "*" } });

  io.use(protectSocket);

  io.on("connection", (socket) => {
    console.log("New socket id");
    console.log(socket.id);
    console.log("User");
    console.log(socket.user);
    socket.on("disconnect", () => {
      console.log("disconnected");
      const { removeUserBySocket, getAllUsers } = require("./socketUsers");
      removeUserBySocket(socket);
      io.emit("refresh-users", getAllUsers());
    });
    socket.on("user", (user) => {
      const { addUser, getAllUsers } = require("./socketUsers");
      console.log("User connected");
      console.log(user);
      console.log(addUser(user, socket));
      io.emit("refresh-users", getAllUsers());
    });
    socket.on("leave-room", (roomId) => {
      const { getUserBySocket } = require("./socketUsers");
      const {} = require("./rooms");
      const userToLeave = getUserBySocket(socket);

      socket.leave(roomId);
    });
    socket.on("message", (data) => {
      const { getConnectedSocket } = require("./socketUsers");
      console.log("Message Received");
      console.log(data);
      console.log("By user ");
      console.log(getConnectedSocket(socket.id));
    });
    socket.on("create-room", ({ userId, roomName }, callback) => {
      console.log("Room request");
      const { createRoom, getRoom } = require("./rooms");
      const result = createRoom(roomName, userId, socket);
      console.log(result);
      callback({ msg: "Success" });
    });

    socket.on("room-msg", ({ msg, roomId }) => {
      console.log(roomId);
      io.to(roomId).emit("room-msg", msg);
    });
    socket.on("add-room-user", ({ userId, roomName }, callback) => {
      const { getRoom, getAllRooms } = require("./rooms");
      const { getUserBySocket, getUserById } = require("./socketUsers");

      console.log("All rooms");
      console.log(getAllRooms());
      console.log("Owner Id");
      const roomOwner = getUserBySocket(socket);
      const userToAdd = getUserById(userId);
      if (!userToAdd.success) {
        callback({ success: false, msg: "cannot add user. invalid id" });
      }
      const socketToAdd = io.sockets.sockets.get(userToAdd.user.socket);
      if (roomOwner.success) {
        const result = getRoom(roomName, roomOwner.user._id);
        if (result.success) {
          result.room.addUser(userId);
          socketToAdd.join(result.room.id);
          callback({ success: true, msg: `${userId} added to room` });
        } else {
          callback(result);
        }
      } else {
        callback({ success: false, msg: "No user found against given socket" });
      }
    });
  });

  return {
    io,
    connectedSockets: io.connectedSockets,
    connectedUsers: io.connectedUsers,
  };
};
