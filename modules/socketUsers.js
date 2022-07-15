let users = [];

setInterval(() => {
  //resets io variables
  users = [];
}, 86400); //number of seconds in a day

const addUser = (user, socket) => {
  if (users.find((prevUser) => prevUser._id === user._id)) {
    return { success: false, err: "User Already Added" };
  } else {
    user.socket = socket.id;
    console.log("Prev users");
    console.log(users);
    users.push(user);
    console.log("New Users");
    console.log(users);
    return { success: true, msg: "User Added" };
  }
};

const removeUserBySocket = (socket) => {
  users = users.filter((user) => user.socket !== socket.id);
};

const getAllUsers = () => {
  return users;
};

const getUserById = (id) => {
  const user = users.find((user) => user._id === id);
  if (user) {
    return { success: true, msg: "User Found", user };
  } else {
    return { success: false, msg: "User Not Found" };
  }
};

const getUserBySocket = (socket) => {
  const user = users.find((user) => user.socket === socket.id);
  if (user) {
    return { success: true, msg: "User Found", user };
  } else {
    return { success: false, msg: "User Not Found" };
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  getUserBySocket,
  removeUserBySocket,
};
