const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../../server/middlewares/controllers/usersControllers");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

module.exports = usersRouter;
