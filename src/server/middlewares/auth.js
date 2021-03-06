require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization.includes("Bearer ")) {
      throw new Error("Bearer is missing");
    }
    const token = authorization.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = user;

    next();
  } catch (error) {
    error.code = 401;
    error.message = "Invalid token";
    error.customMessage = "Invalid token";

    next(error);
  }
};

module.exports = auth;
