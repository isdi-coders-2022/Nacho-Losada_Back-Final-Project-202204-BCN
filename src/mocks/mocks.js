const mockSummonerList = {
  summoners: [
    {
      summonerName: "Mike Old",
      creatorName: "Maicol",
      rankImage:
        "https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/Aatrox.png",
      rank: "Wood III",
      firstRole: "/images/positions/Bot.png",
      firstRoleChamps: ["Zac", "Annie", "Graves"],
      secondRole: "/images/positions/Top.png",
      secondRoleChamps: ["Zac", "Annie", "Graves"],
      description: "Lolen Ipsum",
    },
    {
      summonerName: "The Seigol",
      creatorName: "Albert",
      rankImage:
        "https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/Aatrox.png",
      rank: "Wood III",
      firstRole: "/images/positions/Bot.png",
      firstRoleChamps: ["Ashe", "Leona", "Brand"],
      secondRole: "/images/positions/Top.png",
      secondRoleChamps: ["Ashe", "Leona", "Brand"],
      description: "Lolen Possum",
    },
  ],
};

const mockSummoner = {
  summonerName: "Test",
  creatorName: "Testeador",
  rankImage:
    "https://ddragon.leagueoflegends.com/cdn/12.10.1/img/champion/Aatrox.png",
  rank: "Wood III",
  firstRole: "/images/positions/Bot.png",
  firstRoleChamps: ["Zac", "Annie", "Graves"],
  secondRole: "/images/positions/Top.png",
  secondRoleChamps: ["Zac", "Annie", "Graves"],
  description: "Lolen Ipsum",
  id: "testId",
};

module.exports = { mockSummonerList, mockSummoner };
