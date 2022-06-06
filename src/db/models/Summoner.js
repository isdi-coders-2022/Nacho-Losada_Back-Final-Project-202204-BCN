const { Schema, model } = require("mongoose");

const SummonerSchema = new Schema({
  summonerName: { type: String, required: true, unique: true },
  creatorName: { type: String, required: true },
  rankImage: { type: String, required: true },
  rank: String,
  firstRole: { type: String, required: true },
  firstRoleChamps: { type: [String], required: true },
  secondRole: { type: String, required: true },
  secondRoleChamps: { type: [String], required: true },
  description: { type: String, required: true },
});

const Summoner = model("Summoner", SummonerSchema, "summoners");
module.exports = Summoner;
