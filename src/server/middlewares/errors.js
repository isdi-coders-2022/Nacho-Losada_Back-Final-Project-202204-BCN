require("dotenv").config();
const debug = require("debug")("social:errors");
const chalk = require("chalk");

const notFoundError = (req, res) => {
  res.status(404).json({ msg: "Endpoint Not Found" });
};

// eslint-disable-next-line no-unused-vars
const generalError = (error, req, res, next) => {
  debug(chalk.red(error.message));
  const errorMessage = error.customMessage ?? "General Error";
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ msg: errorMessage });
};

module.exports = {
  notFoundError,
  generalError,
};
