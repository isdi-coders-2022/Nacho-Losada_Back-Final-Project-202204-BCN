const { MongoMemoryServer } = require("mongodb-memory-server");
const { mongoose } = require("mongoose");
const request = require("supertest");
const connectDB = require("..");
const app = require("../../server");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await connectDB(mongoServer.getUri());
});
afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

describe("Given a POST /user/register endpoint", () => {
  describe("When it receives a request with a new user", () => {
    test("Then it should return the username insde the body with a 201 statuscode ", async () => {
      const newUser = {
        name: "Morgan",
        username: "morganfreeman",
        password: "morgan",
        email: "morgan@freeman.com",
      };

      const { body } = await request(app)
        .post("/user/register")
        .send(newUser)
        .expect(201);
      const newUsername = { username: newUser.username };

      expect(body).toStrictEqual(newUsername);
    });
  });
});
