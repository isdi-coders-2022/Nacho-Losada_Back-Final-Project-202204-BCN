const { Schema, model } = require("mongoose");

const SummonerSchema = new Schema({
  summonerName: { type: String, required: true, unique: true },
  creatorName: { type: String, required: true },
  rank: { type: String, required: true },
  division: { type: String, required: true },
  firstRole: { type: String, required: true },
  firstRoleChamps: { type: [String], required: true },
  secondRole: { type: String },
  secondRoleChamps: { type: [String] },
  description: { type: String, required: true },
});

const Summoner = model("Summoner", SummonerSchema, "summoners");
module.exports = Summoner;
