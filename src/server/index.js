const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");
const { notFoundError, generalError } = require("./middlewares/errors");
const usersRouter = require("../db/routers/usersRouter");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:4000",
    "http://localhost:4001",
    "https://nacho-losada-front-final-project-202204-bcn.netlify.app/",
    "https://nacho-losada-front-final-project-202204-bcn.netlify.app",
  ],
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());

app.use("/user", usersRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
