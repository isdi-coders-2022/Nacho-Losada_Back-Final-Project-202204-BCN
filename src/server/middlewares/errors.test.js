const { notFoundError, generalError } = require("./errors");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a notFoundError function", () => {
  describe("When invoked with a request", () => {
    test("Then it should invoke res status method with a 404", () => {
      const expectedError = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
    test("Then it should invoke res json method with the message 'Endpoint Not Found'", () => {
      const expectedErrorMessage = { msg: "Endpoint Not Found" };

      notFoundError(null, res);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });
});

describe("Given a generalError function", () => {
  describe("When invoked with an empty error", () => {
    test("Then it should invoke res status method with a 500", () => {
      const error = {};
      const expectedError = 500;

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
    test("Then it should invoke res json method with a 'General Error' message", () => {
      const error = {};
      const expectedErrorMessage = { msg: "General Error" };

      generalError(error, null, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedErrorMessage);
    });
  });

  describe("When invoked with a custom error wich status code is 403 and a custom message 'No puedes pasar'", () => {
    const error = { statusCode: 403, customMessage: "No puedes pasar" };

    test("Then it should invoke res status method with a 403", () => {
      const expectedError = 403;

      generalError(error, null, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedError);
    });
    test("Then it should invoke res json method with a 403", () => {
      const expectedCustomError = { msg: "No puedes pasar" };

      generalError(error, null, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
