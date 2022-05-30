const debug = require("debug")("lolingo:userControllers");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const User = require("../../../db/models/User");

const registerUser = async (req, res, next) => {
  const { name, username, password, email } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    const error = new Error("Wrong username");
    error.statusCode = 409;
    error.customMessage = "This username already exists";

    next(error);
  } else {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: encryptedPassword,
      favorites: [],
    });

    debug(chalk.green("New user registered"));

    res.status(201).json(newUser.username);
  }
};

module.exports = { registerUser };
