const express = require("express");
const auth = require("../../server/middlewares/auth");
const {
  loadSummoners,
  deleteSummoner,
  createSummoner,
  editSummoner,
} = require("../../server/middlewares/controllers/summonersControllers");

const summonersRouter = express.Router();

summonersRouter.get("", loadSummoners);
summonersRouter.delete("/:id", auth, deleteSummoner);
summonersRouter.post("", auth, createSummoner);
summonersRouter.post("/edit/:id", auth, editSummoner);

module.exports = summonersRouter;
