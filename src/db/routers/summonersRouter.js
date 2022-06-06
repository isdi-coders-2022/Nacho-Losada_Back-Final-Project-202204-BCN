const express = require("express");
const {
  loadSummoners,
} = require("../../server/middlewares/controllers/summonersControllers");

const summonersRouter = express.Router();

summonersRouter.get("", loadSummoners);

module.exports = summonersRouter;
