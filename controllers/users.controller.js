const User = require("../models/users.model");

const authenticateUser = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    //if username and password provided
    User.findOne({ username, password })
      .then((user) => {
        console.log(user);
        if (user) {
          res.status(200).json({ success: true, msg: "User Exists" });
        } else {
          res
            .status(400)
            .json({ success: false, msg: "Invalid username or password" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, err: err });
      });
  } else {
    res.status(400).json({
      success: false,
      err: "username and password both should be provided",
    });
  }
};

const addUser = (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const newUser = new User({
      username,
      password,
    });
    newUser
      .save()
      .then(() => res.status(200).json({ success: true }))
      .catch((err) => res.status(400).json({ success: false, err: err }));
  } else {
    res.status(400).json({
      success: false,
      err: "username and password both should be provided",
    });
  }
};

module.exports = {
  addUser,
  authenticateUser,
};
