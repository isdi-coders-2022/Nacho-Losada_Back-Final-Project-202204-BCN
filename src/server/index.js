const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const usersRouter = require("../db/routers/usersRouter");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
