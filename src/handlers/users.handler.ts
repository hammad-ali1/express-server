//@ts-nocheck
export default function (io: any, socket: any) {
  //get all users online
  const getAllUsers = () => {
    console.log("Fetching all users");
    const connectedSockets = Array.from(io.sockets.sockets.values());
    const connectedUsers = connectedSockets.map((socket) => socket.user);
    console.log(connectedUsers);
    return connectedUsers;
  };

  //returns true if a user already exists
  const isExists = (user) => {
    const allUsers = getAllUsers();
    const exists = allUsers.find((prevUser) => prevUser._id === user._id);
    if (exists) {
      return true;
    } else {
      return false;
    }
  };

  //event listeners
  //disconnect
  socket.on("disconnect", () => {
    console.log("disconnected");
    io.emit("new-users", getAllUsers());
  });

  return {
    getAllUsers,
    isExists,
  };
}
