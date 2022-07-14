module.exports = function (server) {
  const io = require("socket.io")(server, { cors: { origin: "*" } });

  io.connectedUsers = {};
  io.connectedSockets = {};
  setInterval(() => {
    //resets io variables
    io.connectedUsers = {};
    io.connectedSockets = {};
  }, 86400); //number of seconds in a day
  io.on("connection", (socket) => {
    socket.rooms = [];
    console.log("New socket id");
    console.log(socket.id);

    socket.on("user", (user) => {
      console.log("User connected");
      console.log(user);
      if (!io.connectedUsers[user._id]) {
        io.connectedUsers[user._id] = user;
      }
      console.log("All users");
      console.log(io.connectedUsers);
      io.connectedSockets[socket.id] = user;
    });
    socket.on("message", (data) => {
      console.log("Message Received");
      console.log(data);
      console.log("By user ");
      console.log(io.connectedSockets[socket.id]);
    });
  });
  return {
    io,
    connectedSockets: io.connectedSockets,
    connectedUsers: io.connectedUsers,
  };
};
