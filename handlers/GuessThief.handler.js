module.exports = function (io, socket) {
  socket.on("refresh-cards", ({ roomId, newCards }) => {
    io.to(roomId).emit("refresh-cards", { newCards });
  });

  socket.on("start-GuessThief", ({ roomId, roundLimit }) => {
    console.log("round limit received: " + roundLimit);
    io.to(roomId).emit("start-GuessThief", { roundLimit });
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
  socket.on("show-cards", ({ show, roomId }) => {
    io.to(roomId).emit("show-cards", { show });
  });
  socket.on("open-snackbar", ({ message, roomId }) => {
    io.to(roomId).emit("open-snackbar", { message });
  });
  socket.on("update-round-limit", ({ roomId, newRoundLimit }) => {
    console.log("updating round limit to: " + newRoundLimit);
    io.to(roomId).emit("update-round-limit", { newRoundLimit });
  });
  return {};
};
