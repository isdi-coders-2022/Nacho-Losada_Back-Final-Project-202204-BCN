const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Summoner",
    },
  ],
});

const User = model("User", UserSchema, "users");
module.exports = User;
