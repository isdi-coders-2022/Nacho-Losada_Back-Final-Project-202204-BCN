const debug = require("debug")("lolingo:summoners");
const chalk = require("chalk");
const Summoner = require("../../../db/models/Summoner");

const loadSummoners = async (req, res, next) => {
  try {
    const summoners = await Summoner.find();
    debug(chalk.greenBright("Summoners loaded"));

    res.status(200).json({ summoners });
  } catch (error) {
    debug(chalk.red("Cannot load summoners"));
    error.customMessage = "Cannot load summoners";

    next(error);
  }
};

const deleteSummoner = async (req, res, next) => {
  const { id } = req.params;

  try {
    const { summonerName } = await Summoner.findByIdAndDelete(id);

    debug(chalk.greenBright(`${summonerName} has been deleted`));
    res.status(202).json(summonerName);
  } catch {
    const error = new Error("Could not find this summoner");
    error.statusCode = 404;
    error.customMessage = "Could not find this summoner";

    debug(chalk.greenBright(`Could not find this summoner`));
    next(error);
  }
};

const createSummoner = async (req, res, next) => {
  const summonerToCreate = req.body;
  const { summonerName } = req.body;

  const summoner = await Summoner.findOne({ summonerName });

  if (!summoner) {
    try {
      await Summoner.create(summonerToCreate);
      debug(chalk.greenBright(`${summonerName} created`));

      res.status(201).json({ summonerName });
    } catch (error) {
      error.customMessage = `Cannot create ${summonerName}`;
      debug(chalk.red(`Cannot create ${summonerName}`));

      next(error);
    }
  } else {
    const error = new Error();
    error.statusCode = 409;
    error.customMessage = `${summonerName} already exist`;
    debug(chalk.greenBright(`${summonerName} already exist`));

    next(error);
  }
};

const editSummoner = async (req, res, next) => {
  const { id } = req.params;
  const {
    summonerName,
    rank,
    division,
    firstRole,
    firstRoleChamps,
    secondRole,
    secondRoleChamps,
    description,
  } = req.body;

  try {
    const { creatorName } = await Summoner.findById(id);

    const editedSummoner = {
      summonerName,
      creatorName,
      rank,
      division,
      firstRole,
      firstRoleChamps,
      secondRole,
      secondRoleChamps,
      description,
    };

    await Summoner.findByIdAndUpdate(id, editedSummoner);
    const newSummoner = await Summoner.findById(id);

    debug(chalk.green("Summoner has been edited"));

    res.status(200).json(newSummoner);
  } catch (error) {
    debug(chalk.red("Error editing the Summoner"));

    error.customMessage = "Could not edit this Summoner";
    error.statusCode = 400;
    next(error);
  }
};

const getOwnSummoners = async (req, res, next) => {
  const { name } = req.userId;

  try {
    const ownSummoners = await Summoner.find({ creatorName: name });

    debug(chalk.greenBright("Summoners loaded"));

    res.status(200).json({ ownSummoners });
  } catch (error) {
    debug(chalk.red("Cannot load summoners"));
    error.customMessage = "Cannot load summoners";

    next(error);
  }
};

module.exports = {
  loadSummoners,
  deleteSummoner,
  createSummoner,
  editSummoner,
  getOwnSummoners,
};
