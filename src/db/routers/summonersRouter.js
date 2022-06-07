const express = require("express");
const {
  loadSummoners,
  deleteSummoner,
} = require("../../server/middlewares/controllers/summonersControllers");

const summonersRouter = express.Router();

summonersRouter.get("", loadSummoners);
summonersRouter.delete("/:id", deleteSummoner);

module.exports = summonersRouter;
