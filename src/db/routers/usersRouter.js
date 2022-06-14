const express = require("express");
const { validate } = require("express-validation");
const loginCredentialsSchema = require("../../schemas/userCredentialsSchema");
const auth = require("../../server/middlewares/auth");

const {
  getOwnSummoners,
} = require("../../server/middlewares/controllers/summonersControllers");
const {
  registerUser,
  loginUser,
} = require("../../server/middlewares/controllers/usersControllers");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", validate(loginCredentialsSchema), loginUser);
usersRouter.get("/my-summoners", auth, getOwnSummoners);

module.exports = usersRouter;
