export default function (io, socket) {
  socket.on("update-marker", ({ marker, socketId }) => {
    io.to(socketId).emit("update-marker", { marker });
  });

  socket.on("refresh-squares", ({ squares, roomId }) => {
    console.log("refreshing squares in room " + roomId);
    console.log(squares);
    socket.to(roomId).emit("refresh-squares", { squares });
  });
  return {};
}
