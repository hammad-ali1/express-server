import { Server } from "socket.io";
import { protectSocket } from "../middleware/auth.middleware.js";
import roomsHandler from "../handlers/rooms.handler.js";
import usersHandler from "../handlers/users.handler.js";
import TTTGameHandler from "../handlers/TTTGame.handler.js";
import GuessThiefHandler from "../handlers/GuessThief.handler.js";

export default function MySocket(server: any) {
  const io = new Server(server, { cors: { origin: "*" } });
  //add middlware
  io.use(protectSocket);

  io.on("connection", (socket) => {
    roomsHandler(io, socket);
    const { getAllUsers } = usersHandler(io, socket);
    TTTGameHandler(io, socket);
    GuessThiefHandler(io, socket);
    io.emit("new-users", getAllUsers());

    //send message to all
    socket.on("message", (data) => {
      console.log("Message Received");
      console.log(data);
      console.log("By user ");
      //@ts-ignore
      console.log(socket.user);
    });
  });

  return {
    io,
  };
}
