const Summoner = require("../../../db/models/Summoner");
const mockSummonerList = require("../../../mocks/mockSummonerList");
const { loadSummoners } = require("./summonersControllers");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a loadSummoners funcion", () => {
  const req = {};

  describe("When it's invoked with a request", () => {
    test("Then it should call the res json methon with the list of summoners", async () => {
      Summoner.find = jest.fn().mockResolvedValue(mockSummonerList);

      const expectedSummoners = await Summoner.find();
      await loadSummoners(req, res);

      expect(res.json).toHaveBeenCalledWith({ summoners: expectedSummoners });
    });
  });

  describe("When it's invoked and an error ocurrs", () => {
    test("Then it should call de next function", async () => {
      const next = jest.fn();
      Summoner.find = jest.fn().mockRejectedValue(new Error());

      await loadSummoners(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
