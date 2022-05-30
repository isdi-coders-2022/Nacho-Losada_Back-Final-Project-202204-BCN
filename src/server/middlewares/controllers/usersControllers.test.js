const User = require("../../../db/models/User");
const { registerUser } = require("./usersControllers");

describe("Given a registerUser function", () => {
  const req = {
    body: {
      name: "Morgan",
      username: "morganfreeman",
      password: "morgan",
      email: "morgan@freeman.com",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When invoked with a request with a new user", () => {
    test("Then it should call the res json method with the username", async () => {
      User.create = jest.fn().mockResolvedValue(req.body);
      User.findOne = jest.fn().mockResolvedValue(false);
      const expectedUsername = "morganfreeman";

      await registerUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedUsername);
    });
  });

  describe("When invoked with a request with an existing user", () => {
    test("Then it should call the next function with an error", async () => {
      User.findOne = jest.fn().mockResolvedValue(true);
      const next = jest.fn();

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
