const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given an auth function", () => {
  describe("When invoked with a request with a valid token", () => {
    const req = {
      headers: {
        authorization: `Bearer grijandemor`,
      },
    };
    const mockId = "12345";
    const next = jest.fn();
    jwt.verify = jest.fn().mockReturnValue({ id: mockId });

    test("Then it should call the next function without arguments", () => {
      auth(req, null, next);

      expect(next).toHaveBeenCalledWith();
    });
    test("Then it should add the 'userId' property with the 'id' to the request", () => {
      auth(req, null, next);

      expect(req).toHaveProperty("userId");
      expect(req.userId).toBe(mockId);
    });
  });

  describe("WHen invoked with a request with an invalid token", () => {
    test("Then it should called the next function with the error 'Invalid token'", () => {
      const req = {
        headers: {
          authorization: `grijandemor`,
        },
      };
      const next = jest.fn();
      const errorMessage = "Invalid token";
      const error = new Error(errorMessage);

      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
