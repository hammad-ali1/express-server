const { protectSocket } = require("../middleware/auth.middleware");

module.exports = function (server) {
  const io = require("socket.io")(server, { cors: { origin: "*" } });
  //add middlware
  io.use(protectSocket);

  io.on("connection", (socket) => {
    const { protectSocket } = require("../middleware/auth.middleware");

    require("../handlers/rooms.handler")(io, socket);
    const { getAllUsers } = require("../handlers/users.handler")(io, socket);
    require("../handlers/TTTGame.handler")(io, socket);
    require("../handlers/GuessThief.handler")(io, socket);
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
