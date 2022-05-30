const express = require("express");
const {
  registerUser,
} = require("../../server/middlewares/controllers/usersControllers");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

module.exports = usersRouter;
