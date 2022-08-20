//@ts-nocheck

export default function (io, socket) {
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
  socket.on("show-cards", ({ show, roomId }) => {
    io.to(roomId).emit("show-cards", { show });
  });
  socket.on("open-snackbar", ({ message, roomId }) => {
    io.to(roomId).emit("open-snackbar", { message });
  });

  socket.on("update-roundLimit", ({ roomId, roundLimit }) => {
    console.log("UPDATING ROUND LIMIT TO :  " + roundLimit);
    console.log("SOCKET ID " + roomId);
    socket.to(roomId).emit("update-roundLimit", { roundLimit });
  });
  return {};
}
