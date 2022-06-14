const { Joi } = require("express-validation");

const loginCredentialsSchema = {
  body: Joi.object({
    username: Joi.string()
      .messages({ message: "Username field is required" })
      .required(),
    password: Joi.string()
      .messages({ message: "A password is required" })
      .required(),
  }),
};

module.exports = loginCredentialsSchema;
