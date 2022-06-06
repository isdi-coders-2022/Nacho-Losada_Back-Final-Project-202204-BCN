const debug = require("debug")("lolingo:summoners");
const chalk = require("chalk");
const Summoner = require("../../../db/models/Summoner");

const loadSummoners = async (req, res, next) => {
  try {
    const summoners = await Summoner.find();
    debug(chalk.greenBright("Summoners loaded"));

    res.status(200).json({ summoners });
  } catch (error) {
    debug(chalk.greenBright("Cannot load summoners"));
    error.customMessage = "Cannot load summoners";

    next(error);
  }
};

module.exports = { loadSummoners };
