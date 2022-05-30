require("dotenv").config();
const debug = require("debug")("lolingo:root");
const chalk = require("chalk");
const connectDB = require("./db");
const initializeServer = require("./server/initializeServer");

const port = process.env.PORT ?? 4000;
const connectionString = process.env.MONGO_CONNECTION;

(async () => {
  try {
    await connectDB(connectionString);
    await initializeServer(port);
  } catch {
    debug(chalk.red("Exiting with errors"));
    process.exit(1);
  }
})();
