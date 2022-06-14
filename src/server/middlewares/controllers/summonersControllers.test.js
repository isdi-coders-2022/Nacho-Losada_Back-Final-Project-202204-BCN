const Summoner = require("../../../db/models/Summoner");
const { mockSummonerList, mockSummoner } = require("../../../mocks/mocks");
const {
  loadSummoners,
  deleteSummoner,
  createSummoner,
  editSummoner,
  getOwnSummoners,
} = require("./summonersControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a loadSummoners funcion", () => {
  const req = {};

  describe("When it's invoked with a request", () => {
    test("Then it should call the res json method with the list of summoners", async () => {
      Summoner.find = jest.fn().mockResolvedValue(mockSummonerList);

      const expectedSummoners = await Summoner.find();
      await loadSummoners(req, res);

      expect(res.json).toHaveBeenCalledWith({ summoners: expectedSummoners });
    });
  });

  describe("When it's invoked and an error ocurrs", () => {
    test("Then it should call de next function", async () => {
      Summoner.find = jest.fn().mockRejectedValue(new Error());

      await loadSummoners(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a deleteSummoner function", () => {
  const req = {
    params: { id: "1234" },
  };

  describe("When it's invoked with a request with an existing summoner id", () => {
    test("Then it should call the res status method with a 202 and json method with the summoner name", async () => {
      Summoner.findByIdAndDelete = jest.fn().mockResolvedValue(mockSummoner);
      const expectedName = mockSummoner.summonerName;

      await deleteSummoner(req, res, next);

      expect(res.status).toHaveBeenCalledWith(202);
      expect(res.json).toHaveBeenCalledWith(expectedName);
    });
  });

  describe("When it's invoked with a request with a non existing id", () => {
    test("Then it should call the next function", async () => {
      Summoner.findByIdAndDelete = jest.fn().mockRejectedValue();
      const errorMessage = "Could not find this summoner";
      const error = new Error(errorMessage);

      await deleteSummoner(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a createSummoner function", () => {
  const req = {
    body: { mockSummoner },
  };

  describe("When invoked with a request with a new summoner", () => {
    test("Then it should call the res status method with a 201", async () => {
      Summoner.findOne = jest.fn().mockResolvedValue(null);
      Summoner.create = jest.fn();
      const expectedStatus = 201;

      await createSummoner(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When invoked with a request with a new summoner but an axios error happens", () => {
    test("Then it should call the next function", async () => {
      Summoner.findOne = jest.fn().mockResolvedValue(null);
      Summoner.create = jest.fn().mockRejectedValue(new Error());

      await createSummoner(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When invoked with a request with an existant summoner name ", () => {
    test("Then it should call the next function", async () => {
      Summoner.findOne = jest.fn().mockResolvedValue(mockSummoner.summonerName);

      await createSummoner(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given an editSummoner function", () => {
  const req = {
    params: { id: "1234" },
    body: { mockSummoner },
  };

  describe("When invoked with a request with an existant id and the summoner", () => {
    test("Then it should call the res status method with a 200", async () => {
      Summoner.findById = jest.fn().mockReturnValue(mockSummoner);
      Summoner.findByIdAndUpdate = jest.fn();

      editSummoner(req, res, next);
      const expectedValue = 200;

      expect(res.status).toHaveBeenCalledWith(expectedValue);
    });
  });

  describe("When invoked with a request with an invalid id", () => {
    test("Then it should call the next functiont", async () => {
      Summoner.findById = jest.fn().mockRejectedValue("");
      Summoner.findByIdAndUpdate = jest.fn();

      editSummoner(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});

describe("Given a geteOwnSummoners function", () => {
  describe("When invoked with a request with the user's name", () => {
    test("Then it should call the res status method with a 200", () => {
      const req = {
        body: { name: "Maicol" },
        userId: { name: "Maicol" },
      };
      const expectedStatusCode = 200;
      Summoner.find = jest.fn().mockResolvedValue(mockSummonerList);

      getOwnSummoners(req, res, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When invoked with a request without the user's name", () => {
    test("Then it should call the next function", () => {
      const req = {
        body: {},
        userId: { name: "Maicol" },
      };
      Summoner.find = jest.fn().mockRejectedValue(new Error());

      getOwnSummoners(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
