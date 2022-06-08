const { MongoMemoryServer } = require("mongodb-memory-server");
const { mongoose } = require("mongoose");
const request = require("supertest");
const connectDB = require("..");
const { mockSummonerList } = require("../../mocks/mocks");
const app = require("../../server");
const Summoner = require("../models/Summoner");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());

  await Summoner.create(mockSummonerList.summoners[0]);
  await Summoner.create(mockSummonerList.summoners[1]);
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a GET /summoners endpoint", () => {
  describe("When it receives a request", () => {
    test.only("Then it should respond with a 200 code and the list of summoners", async () => {
      const {
        body: { summoners },
      } = await request(app).get("/summoners").expect(200);
      Summoner.find();

      expect(summoners).toHaveLength(mockSummonerList.summoners.length);
      expect(summoners[0]).toHaveProperty("summonerName", "Mike Old");
    });
  });
});
