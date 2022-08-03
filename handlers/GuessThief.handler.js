module.exports = function (io, socket) {
  socket.on("refresh-cards", ({ roomId, newCards }) => {
    io.to(roomId).emit("refresh-cards", { newCards });
  });

  socket.on("start-GuessThief", ({ roomId }) => {
    io.to(roomId).emit("start-GuessThief");
  });

  socket.on("update-points", ({ newPoints, roomId }) => {
    io.to(roomId).emit("update-points", { newPoints });
  });

  socket.on("play-again-GuessThief", ({ roomId }) => {
    io.to(roomId).emit("play-again-GuessThief");
  });
  socket.on("finish-game", ({ roomId }) => {
    io.to(roomId).emit("finish-game");
  });
  return {};
};
