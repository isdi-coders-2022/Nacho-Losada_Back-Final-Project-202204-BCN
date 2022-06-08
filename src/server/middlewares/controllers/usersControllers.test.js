const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../../db/models/User");
const { registerUser, loginUser } = require("./usersControllers");

const mockExpectedToken = "xxxx";
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: () => mockExpectedToken,
}));

describe("Given a registerUser function", () => {
  const req = {
    body: {
      name: "Morgan",
      username: "morganfreeman",
      password: "morgan",
      email: "morgan@freeman.com",
    },
  };

  describe("When invoked with a request with a new user", () => {
    test("Then it should call the res json method with the username", async () => {
      User.create = jest.fn().mockResolvedValue(req.body);
      User.findOne = jest.fn().mockResolvedValue(null);
      const expectedUsername = { username: "morganfreeman" };

      await registerUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedUsername);
    });
  });

  describe("When invoked with a request with an existing user", () => {
    test("Then it should call the next function with an error", async () => {
      User.findOne = jest.fn().mockResolvedValue(req.body);
      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a loginUser function", () => {
  const req = {
    body: {
      username: "morganfreeman",
      password: "morgan",
    },
  };

  describe("When invoked with a registered user and password", () => {
    test("Then it should invoke the res json method with a token", async () => {
      User.findOne = jest.fn().mockResolvedValue(req.body);
      bcrypt.compare = jest.fn().mockResolvedValue(true);

      const token = jwt.sign();
      await loginUser(req, res);
      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When invoked with an unregistered user", () => {
    test("Then it should invoke the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const next = jest.fn();

      await loginUser(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with a registered user and a wrong password", () => {
    test("Then it should invoke the next function", async () => {
      User.findOne = jest.fn().mockResolvedValue(req.body);
      const next = jest.fn();
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
