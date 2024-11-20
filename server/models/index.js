const { Sequelize, DataTypes } = require("sequelize");
const {
  randomUsername,
  randomUserIcon,
} = require("../utils/randomUserProperties");
const UserModel = require("./user");
const SiteModel = require("./site");
const CheckinModel = require("./checkin");
const UserBonusModel = require("./userBonus");
const CommunityBonusModel = require("./communityBonus");
const BatchModel = require("./batch");
const DropModel = require("./drop");
const BatchDropModel = require("./batchdrop");
const LeaderboardModel = require("./leaderboard");
const CheckinEventModel = require("./checkinEvent");
const UserSitesModel = require("./userSites");
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
const UserBonus = UserBonusModel(sequelize, DataTypes);
const CommunityBonus = CommunityBonusModel(sequelize, DataTypes);
const Batch = BatchModel(sequelize, DataTypes);
const Drop = DropModel(sequelize, DataTypes);
const BatchDrop = BatchDropModel(sequelize, DataTypes);
const Leaderboard = LeaderboardModel(sequelize, DataTypes);
const UserScore = UserScoreModel(sequelize, DataTypes);
const CheckinEvent = CheckinEventModel(sequelize, DataTypes);
const UserSites = UserSitesModel(sequelize, DataTypes);
// Call the associate function for each model
const models = {
  User,
  Site,
  Checkin,
  UserBonus,
  CommunityBonus,
  Batch,
  Drop,
  BatchDrop,
  Leaderboard,
  UserScore,
  CheckinEvent,
  UserSites,
};
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Define initial sites
const initialSites = [
  {
    "fullName": "Chumba",
    "isPostcard": true,
    "url": "lobby.chumbacasino.com/",
    "parentCompany": "VGW",
    "imagePath": "chumba.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": 5,
    "postcardLeadTime": 120,
    "postcardConsistancy": 10,
    "postcardPopularity": 1000
  },
  {
    "fullName": "WowVegas",
    "isPostcard": true,
    "url": "wowvegas.com/lobby",
    "parentCompany": "Wow Vegas",
    "imagePath": "wow.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": 3,
    "postcardLeadTime": 200,
    "postcardConsistancy": 2,
    "postcardPopularity": 200
  },
  {
    "fullName": "Sportzino",
    "isPostcard": false,
    "url": "sportzino.com/casino-lobby/lobby",
    "parentCompany": "Priority Play",
    "imagePath": "sportzino.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Zula Casino",
    "isPostcard": false,
    "url": "www.zulacasino.com/lobby",
    "parentCompany": "Priority Play",
    "imagePath": "zula.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Global Poker",
    "isPostcard": true,
    "url": "play.globalpoker.com/",
    "parentCompany": "VGW",
    "imagePath": "global.png",
    "checkinType": "DAILY",
    "checkingResetTime": "7:00:00",
    "checkinValue": 50,
    "postcardValue": 5,
    "postcardLeadTime": 140,
    "postcardConsistancy": 8,
    "postcardPopularity": 300
  },
  {
    "fullName": "Spree",
    "isPostcard": false,
    "url": "spree.com/slots",
    "parentCompany": "Play Spree Ltd",
    "imagePath": "spree.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": null,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "DingDingDing",
    "isPostcard": false,
    "url": "dingdingding.com/lobby/",
    "parentCompany": "Living Pixels Studio LLC",
    "imagePath": "ding.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "22:00:00",
    "checkinValue": 100,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Sweeps Slots",
    "isPostcard": false,
    "url": "www.sweepslots.com/",
    "parentCompany": "Regal Technologies, LLC",
    "imagePath": "sweeps.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": null,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Real Prize",
    "isPostcard": false,
    "url": "realprize.com/#",
    "parentCompany": "ReaPlay Tech Inc",
    "imagePath": "real.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 30,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Rolling Riches",
    "isPostcard": false,
    "url": "www.rollingriches.com/",
    "parentCompany": "Rolling Riches",
    "imagePath": "rolling.png",
    "checkinType": "HOURLY",
    "checkingResetTime": "6:00:00",
    "checkinValue": null,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Pulsz",
    "isPostcard": true,
    "url": "www.pulsz.com/home",
    "parentCompany": "Yellow Social Interactive Limited",
    "imagePath": "pulsz.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": 5,
    "postcardLeadTime": 180,
    "postcardConsistancy": 5,
    "postcardPopularity": 222
  },
  {
    "fullName": "Stackr Casino",
    "isPostcard": false,
    "url": "www.stackrcasino.com/",
    "parentCompany": "Stackr Social LLC",
    "imagePath": "stackr.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 10,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Scratchful",
    "isPostcard": false,
    "url": "www.scratchful.com/home",
    "parentCompany": "B-Two Operations Limited",
    "imagePath": "scratchful.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": null,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Funrize",
    "isPostcard": false,
    "url": "funrize.com/en/",
    "parentCompany": null,
    "imagePath": "funrize.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 0,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Luckyland",
    "isPostcard": true,
    "url": "www.luckylandslots.com/",
    "parentCompany": "VGW",
    "imagePath": "luckyland.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": 5,
    "postcardLeadTime": 120,
    "postcardConsistancy": 9,
    "postcardPopularity": 1200
  },
  {
    "fullName": "McLuck",
    "isPostcard": true,
    "url": "www.mcluck.com/home",
    "parentCompany": null,
    "imagePath": "mcluck.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 30,
    "postcardValue": 5,
    "postcardLeadTime": 190,
    "postcardConsistancy": 2,
    "postcardPopularity": 150
  },
  {
    "fullName": "MoonSpin",
    "isPostcard": false,
    "url": "moonspin.us/home",
    "parentCompany": null,
    "imagePath": "moonspin.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "15:00:00",
    "checkinValue": 30,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Modo",
    "isPostcard": true,
    "url": "modo.us/lobby",
    "parentCompany": null,
    "imagePath": "modo.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": 5,
    "postcardLeadTime": 250,
    "postcardConsistancy": 3,
    "postcardPopularity": 50
  },
  {
    "fullName": "Golden Hearts",
    "isPostcard": false,
    "url": "www.goldenheartsgames.com/login",
    "parentCompany": null,
    "imagePath": "golden.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "High 5",
    "isPostcard": true,
    "url": "fun.high5casino.com/gc",
    "parentCompany": null,
    "imagePath": "high5.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": 5,
    "postcardLeadTime": 150,
    "postcardConsistancy": 5,
    "postcardPopularity": 250
  },
  {
    "fullName": "Stake",
    "isPostcard": true,
    "url": "stake.us",
    "parentCompany": null,
    "imagePath": "stake.png",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": 5,
    "postcardLeadTime": 300,
    "postcardConsistancy": 2,
    "postcardPopularity": 50
  },
  {
    "fullName": "Fortune Coins",
    "isPostcard": false,
    "url": "www.fortunecoins.com",
    "parentCompany": "Priority Play",
    "imagePath": "fortune.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Crown Casino",
    "isPostcard": false,
    "url": "crowncoinscasino.com/",
    "parentCompany": null,
    "imagePath": "crown.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Pulsz Bingo",
    "isPostcard": false,
    "url": "www.pulszbingo.com/",
    "parentCompany": null,
    "imagePath": "pulszbingo.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Smiles",
    "isPostcard": false,
    "url": "smilescasino.com/",
    "parentCompany": null,
    "imagePath": "smiles.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Lucky Bird",
    "isPostcard": false,
    "url": "luckybird.io/",
    "parentCompany": null,
    "imagePath": "luckybird.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 20,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Clubs Poker",
    "isPostcard": false,
    "url": "play.clubs.poker/",
    "parentCompany": null,
    "imagePath": "clubspoker.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Jackpota",
    "isPostcard": false,
    "url": "jackpota.com/",
    "parentCompany": null,
    "imagePath": "jackpota.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 30,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "Mega Bonanza",
    "isPostcard": false,
    "url": "www.megabonanza.com/home/",
    "parentCompany": null,
    "imagePath": "megabonanza.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 30,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "SunSpin",
    "isPostcard": true,
    "url": "www.sunspin.us/home",
    "parentCompany": null,
    "imagePath": "sunspin.ico",
    "checkinType": null,
    "checkingResetTime": "0:00:00",
    "checkinValue": 0,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Betcoin Social",
    "isPostcard": true,
    "url": "www.betcoin.social/",
    "parentCompany": null,
    "imagePath": "betcoin.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 10,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Lucky Hands",
    "isPostcard": true,
    "url": "luckyhands.com/",
    "parentCompany": null,
    "imagePath": "luckyhands.webp",
    "checkinType": "HOURLY",
    "checkingResetTime": "4:00:00",
    "checkinValue": 50,
    "postcardValue": 0,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Moozi",
    "isPostcard": true,
    "url": "moozi.com/",
    "parentCompany": null,
    "imagePath": "moozi.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "24_HOUR",
    "checkinValue": 30,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "MyPrize",
    "isPostcard": true,
    "url": "myprize.us",
    "parentCompany": null,
    "imagePath": "myprize.png",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Punt",
    "isPostcard": true,
    "url": "punt.com/",
    "parentCompany": null,
    "imagePath": "punt.ico",
    "checkinType": "HOURLY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 50,
    "postcardValue": 0,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Sports Millions",
    "isPostcard": true,
    "url": "www.sportsmillions.com/",
    "parentCompany": null,
    "imagePath": "sportsmillions.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 30,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "YAY",
    "isPostcard": true,
    "url": "www.yaycasino.com/lobby",
    "parentCompany": "Priority Play",
    "imagePath": "yay.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Fortune Wheels",
    "isPostcard": true,
    "url": "fortunewheelz.com/",
    "parentCompany": null,
    "imagePath": "fortunewheelz.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 0,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "HelloMillions",
    "isPostcard": true,
    "url": "https://www.hellomillions.com/",
    "parentCompany": null,
    "imagePath": "hellomillions.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 30,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "Ruby Sweeps",
    "isPostcard": false,
    "url": "https://play.rubysweeps.com/",
    "parentCompany": null,
    "imagePath": "rubysweeps.ico",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "GoldSlips",
    "isPostcard": false,
    "url": "https://play.goldslips.com/",
    "parentCompany": null,
    "imagePath": "goldslips.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 100,
    "postcardValue": null,
    "postcardLeadTime": null,
    "postcardConsistancy": null,
    "postcardPopularity": null
  },
  {
    "fullName": "JefeBet",
    "isPostcard": true,
    "url": "https://www.jefebet.com/",
    "parentCompany": null,
    "imagePath": "jefebet.webp",
    "checkinType": "HOURLY",
    "checkingResetTime": "6:00:00",
    "checkinValue": 20,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "The Money Factory",
    "isPostcard": true,
    "url": "https://www.themoneyfactory.com/",
    "parentCompany": null,
    "imagePath": "themoneyfactory.png",
    "checkinType": "DAILY",
    "checkingResetTime": "0:00:00",
    "checkinValue": 20,
    "postcardValue": 3,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  },
  {
    "fullName": "PlayFame",
    "isPostcard": true,
    "url": "https://www.playfame.com/lobby",
    "parentCompany": null,
    "imagePath": "playfame.ico",
    "checkinType": "24_HOUR",
    "checkingResetTime": "0:00:00",
    "checkinValue": 20,
    "postcardValue": 5,
    "postcardLeadTime": 0,
    "postcardConsistancy": 0,
    "postcardPopularity": 0
  }
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
        where: { fullName: site.fullName },
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
