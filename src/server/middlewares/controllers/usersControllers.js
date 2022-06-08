const debug = require("debug")("lolingo:userControllers");
const chalk = require("chalk");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    res.status(201).json({ username: newUser.username });
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new Error("Username not found");
    error.statusCode = 403;
    error.customMessage = "Username or password is wrong";

    next(error);
  } else {
    const userData = {
      name: user.name,
      username: user.username,
      id: user.id,
    };
    const rightPassword = await bcrypt.compare(password, user.password);

    if (!rightPassword) {
      const error = new Error("Incorrect password");
      error.statusCode = 403;
      error.customMessage = "Username or password is wrong";

      next(error);
    } else {
      const token = jwt.sign(userData, process.env.JWT_SECRET);

      res.status(200).json({ token });
    }
  }
};

module.exports = { registerUser, loginUser };
