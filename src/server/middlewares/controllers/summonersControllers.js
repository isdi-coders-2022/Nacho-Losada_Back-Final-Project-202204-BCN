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

const deleteSummoner = async (req, res, next) => {
  const { id } = req.params;

  try {
    const summoner = await Summoner.findByIdAndDelete(id);

    res.status(200).json(summoner.summonerName);
    if (summoner) {
      debug(chalk.greenBright(`${summoner.summonerName} has been deleted`));
    }
  } catch (error) {
    error.statusCode = 404;
    error.customMessage = "Could not find this summoner";

    debug(chalk.greenBright(`Could not find this summoner`));
    next(error);
  }
};

module.exports = { loadSummoners, deleteSummoner };
