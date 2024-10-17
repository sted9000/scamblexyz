const { Sequelize, DataTypes } = require("sequelize");
const {
  randomUsername,
  randomUserIcon,
} = require("../utils/randomUserProperties");
const UserModel = require("./user");
const SiteModel = require("./site");
const CheckinModel = require("./checkin");
const BonusModel = require("./bonus");
const BatchModel = require("./batch");
const DropModel = require("./drop");
const BatchDropModel = require("./batchdrop");
const LeaderboardModel = require("./leaderboard");
const CheckinEventModel = require("./checkinEvent");
const BonusClaimModel = require("./bonusClaim");
const UserSitesModel = require("./userSites");
const BonusEventModel = require("./bonusEvent");
const UserScoreModel = require("./userScore");

// Create a new Sequelize instance
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});

// Initialize the models
const User = UserModel(sequelize, DataTypes);
const Site = SiteModel(sequelize, DataTypes);
const Checkin = CheckinModel(sequelize, DataTypes);
const Bonus = BonusModel(sequelize, DataTypes);
const Batch = BatchModel(sequelize, DataTypes);
const Drop = DropModel(sequelize, DataTypes);
const BatchDrop = BatchDropModel(sequelize, DataTypes);
const Leaderboard = LeaderboardModel(sequelize, DataTypes);
const UserScore = UserScoreModel(sequelize, DataTypes);
const CheckinEvent = CheckinEventModel(sequelize, DataTypes);
const BonusClaim = BonusClaimModel(sequelize, DataTypes);
const UserSites = UserSitesModel(sequelize, DataTypes);
const BonusEvent = BonusEventModel(sequelize, DataTypes);
// Call the associate function for each model
const models = {
  User,
  Site,
  Checkin,
  Bonus,
  Batch,
  Drop,
  BatchDrop,
  Leaderboard,
  UserScore,
  CheckinEvent,
  BonusClaim,
  UserSites,
  BonusEvent,
};
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Define initial sites
const initialSites = [
  {
    siteName: "Chumba",
    isPostcard: true,
    url: "https://lobby.chumbacasino.com/",
  },
  {
    siteName: "WowVegas",
    isPostcard: true,
    url: "https://wowvegas.com/lobby",
  },
  {
    siteName: "Sportzino",
    isPostcard: false,
    url: "https://sportzino.com/casino-lobby/lobby",
  },
  {
    siteName: "Zula Casino",
    isPostcard: false,
    url: "https://www.zulacasino.com/lobby",
  },
  {
    siteName: "Global Poker",
    isPostcard: true,
    url: "https://play.globalpoker.com/",
  },
  {
    siteName: "Spree",
    isPostcard: false,
    url: "https://spree.com/slots",
  },
  {
    siteName: "DingDingDing",
    isPostcard: false,
    url: "https://dingdingding.com/lobby/",
  },
  {
    siteName: "Sweeps Slots",
    isPostcard: false,
    url: "https://www.sweepslots.com/",
  },
  {
    siteName: "Real Prize",
    isPostcard: false,
    url: "https://realprize.com/#",
  },
  {
    siteName: "Rolling Riches",
    isPostcard: false,
    url: "https://www.rollingriches.com/",
  },
  {
    siteName: "Pulsz",
    isPostcard: true,
    url: "https://www.pulsz.com/home",
  },
  {
    siteName: "Stackr Casino",
    isPostcard: false,
    url: "https://www.stackrcasino.com/",
  },
  {
    siteName: "Scratchful",
    isPostcard: false,
    url: "https://www.scratchful.com/home",
  },
  {
    siteName: "Funrize",
    isPostcard: false,
    url: "https://funrize.com/en/",
  },
  {
    siteName: "Luckyland",
    isPostcard: true,
    url: "https://www.luckylandslots.com/",
  },
  {
    siteName: "McLuck",
    isPostcard: true,
    url: "https://www.mcluck.com/home",
  },
  {
    siteName: "MoonSpin",
    isPostcard: false,
    url: "https://moonspin.us/home",
  },
  {
    siteName: "Modo",
    isPostcard: true,
    url: "https://modo.us/lobby",
  },
  {
    siteName: "Golden Hearts",
    isPostcard: false,
    url: "https://www.goldenheartsgames.com/login",
  },
  {
    siteName: "High 5",
    isPostcard: true,
    url: "https://fun.high5casino.com/gc",
  },
  {
    siteName: "Stake",
    isPostcard: true,
    url: "https://stake.us/",
  },
  {
    siteName: "Fortune Coins",
    isPostcard: false,
    url: "https://www.fortunecoins.com",
  },
  {
    siteName: "Crown Casino",
    isPostcard: false,
    url: "https://crowncoinscasino.com/",
  },
  {
    siteName: "Pulsz Bingo",
    isPostcard: false,
    url: "https://www.pulszbingo.com/",
  },
  {
    siteName: "Smiles",
    isPostcard: false,
    url: "https://smilescasino.com/",
  },
  {
    siteName: "Lucky Bird",
    isPostcard: false,
    url: "https://luckybird.io/",
  },
  {
    siteName: "Clubs Poker",
    isPostcard: false,
    url: "https://play.clubs.poker/",
  },
  {
    siteName: "Jackpota",
    isPostcard: false,
    url: "https://jackpota.com/",
  },
  {
    siteName: "Mega Bonanza",
    isPostcard: false,
    url: "https://www.megabonanza.com/home/",
  },
];

// Function to sync database and create initial sites
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });

    // Create 15 Initial Users and Populate the RankedUsers View
    for (let i = 1; i <= 15; i++) {
      const username = randomUsername();
      const userIcon = randomUserIcon();
      const [userRecord, created] = await User.findOrCreate({
        where: { email: `testuser${i}@example.com` },
        defaults: {
          googleId: `googleId${i}`,
          email: `testuser${i}@example.com`,
          username,
          userIcon,
        },
      });

      if (created) {
        await userRecord.save;
        // Create or update UserScore for each user
        const checkinScore = Math.floor(Math.random() * 1000);
        const bonusScore = Math.floor(Math.random() * 1000);
        const postcardScore = Math.floor(Math.random() * 1000);
        const overallScore = checkinScore + bonusScore + postcardScore;
        await UserScore.findOrCreate({
          where: { userId: userRecord.id },
          defaults: {
            userId: userRecord.id,
            overallScore: overallScore,
            checkinScore: checkinScore,
            bonusScore: bonusScore,
            postcardScore: postcardScore,
          },
        });
      }
    }

    // Create initial sites
    for (const site of initialSites) {
      const [siteRecord, created] = await Site.findOrCreate({
        where: { siteName: site.siteName },
        defaults: site,
      });
    }

  } catch (error) {
    console.error("Unable to sync the database:", error);
  }
}

module.exports = {
  sequelize,
  ...models,
  syncDatabase,
};
