const { protectSocket } = require("../middleware/auth.middleware");

module.exports = function (server) {
  const io = require("socket.io")(server, { cors: { origin: "*" } });
  io.use(protectSocket);

  io.on("connection", (socket) => {
    require("../handlers/rooms.handler")(io, socket);
    const { getAllUsers } = require("../handlers/users.handler")(io, socket);

    io.emit("new-users", getAllUsers());

    //send message to all
    socket.on("message", (data) => {
      console.log("Message Received");
      console.log(data);
      console.log("By user ");
      console.log(socket.user);
    });
  });

  return {
    io,
  };
};
