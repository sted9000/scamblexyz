const { UserScore, User } = require('../models');

/*** Leadeboard Constants ***/
const LEADERBOARD_CATEGORIES = ['overall', 'checkin', 'bonus', 'postcard'];
const LEADERBOARD_TYPES = ['all_time', 'weekly', 'today', 'yesterday'];
const LEADERBOARD_KEYS = {};
LEADERBOARD_CATEGORIES.forEach(category => {
  LEADERBOARD_KEYS[category] = {};
  LEADERBOARD_TYPES.forEach(type => {
    LEADERBOARD_KEYS[category][type] = `leaderboard:${category}:${type}`;
  });
});

/*** Get the leaderboard from Redis ***/
const getLeaderboardFromRedis = async (redisClient) => {
    try {
        const leaderboards = {};
        for (const category of LEADERBOARD_CATEGORIES) {
          leaderboards[category] = {};
          for (const [type, key] of Object.entries(LEADERBOARD_KEYS[category])) {
            const leaderboard = await redisClient.zrevrange(
              key,
              0,
              50,
              "WITHSCORES"
            );
            leaderboards[category][type] = formatLeaderboard(leaderboard);
          }
        }
        return leaderboards;
      } catch (error) {
        console.error("Error sending leaderboards to client:", error);
      }
}

const formatLeaderboard = (leaderboard) => {
    const formatted = [];
    for (let i = 0; i < leaderboard.length; i += 2) {
      const [userId, username, userIcon, createdAt] = leaderboard[i].split(":");
      formatted.push({
        userId,
        username,
        userIcon,
        createdAt,
        score: parseInt(leaderboard[i + 1], 10),
        rank: Math.floor(i / 2) + 1,
      });
    }
    return formatted;
}

const updateCategoryLeaderboard = async (redisClient, category, key, value) => {
    console.log("Updating category leaderboard", category, key, value);
    await Promise.all(
      Object.values(LEADERBOARD_KEYS[category]).map(async (leaderboardKey) => {
        await redisClient.zincrby(leaderboardKey, value, key);
      })
    );
    return { success: true };
}

const getUserScoreAndRank = async (redisClient, key) => {
    const userOverallScore = await redisClient.zscore(LEADERBOARD_KEYS.overall.all_time, key);
    const userOverallRank = await redisClient.zrevrank(LEADERBOARD_KEYS.overall.all_time, key);
    const userCheckinScore = await redisClient.zscore(LEADERBOARD_KEYS.checkin.all_time, key);
    const userCheckinRank = await redisClient.zrevrank(LEADERBOARD_KEYS.checkin.all_time, key);
    const userBonusScore = await redisClient.zscore(LEADERBOARD_KEYS.bonus.all_time, key);
    const userBonusRank = await redisClient.zrevrank(LEADERBOARD_KEYS.bonus.all_time, key);
    const userPostcardScore = await redisClient.zscore(LEADERBOARD_KEYS.postcard.all_time, key);
    const userPostcardRank = await redisClient.zrevrank(LEADERBOARD_KEYS.postcard.all_time, key);
    const userOverallTodayScore = await redisClient.zscore(LEADERBOARD_KEYS.overall.today, key);
    const userCheckinTodayScore = await redisClient.zscore(LEADERBOARD_KEYS.checkin.today, key);
    const userBonusTodayScore = await redisClient.zscore(LEADERBOARD_KEYS.bonus.today, key);
    const userPostcardTodayScore = await redisClient.zscore(LEADERBOARD_KEYS.postcard.today, key);
    return { userOverallScore, userOverallRank, userCheckinScore, userCheckinRank, userBonusScore, userBonusRank, userPostcardScore, userPostcardRank, userOverallTodayScore, userCheckinTodayScore, userBonusTodayScore, userPostcardTodayScore };
}

const formUserKey = async (userId) => {
    const user = await User.findByPk(userId);
    return `${userId}:${user.username}:${user.userIcon}:${new Date(user.createdAt).toISOString()}`;
}

const initializeLeaderboardFromDatabase = async (redisClient, category, leaderboardKey) => {
    try {
      console.log(`Initializing ${category} leaderboard: ${leaderboardKey}`);
  
      // Query the database to get the top users for the specific category
      const topUsers = await UserScore.findAll({
        order: [[`${category}Score`, 'DESC']],
        limit: 100,
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'userIcon', 'createdAt'],
          },
        ],
      });
  
      // If there are users, add them to Redis
      if (topUsers.length > 0) {
        const multi = redisClient.multi();
  
        topUsers.forEach((userScore) => {
          const key = `${userScore.User.id}:${userScore.User.username}:${userScore.User.userIcon}:${userScore.User.createdAt}`;
          multi.zadd(leaderboardKey, userScore[`${category}Score`], key);
        });
  
        await multi.exec();
        console.log(
          `Leaderboard ${leaderboardKey} initialized with ${topUsers.length} users`
        );
      } else {
        console.log(`No users found for leaderboard: ${leaderboardKey}`);
      }
    } catch (error) {
      console.error(`Error initializing leaderboard ${leaderboardKey}:`, error);
    }
  }
  
const initializeLeaderboards = async (redisClient) => {
    console.log("Initializing leaderboards...");
    for (const category of LEADERBOARD_CATEGORIES) {
      for (const [type, key] of Object.entries(LEADERBOARD_KEYS[category])) {
        const leaderboardExists = await redisClient.exists(key);
        if (!leaderboardExists) {
          await initializeLeaderboardFromDatabase(redisClient, category, key);
        } else {
          console.log(`Leaderboard ${category}:${type} already exists in Redis.`);
        }
      }
    }
    console.log("Leaderboards initialization complete.");
}

// Function to reset daily and weekly leaderboards
// const resetLeaderboards = async () => {
//     const now = moment();
  
//     // Reset daily leaderboards
//     if (now.hour() === 0 && now.minute() === 0) {
//       for (const category of LEADERBOARD_CATEGORIES) {
//         await redisClient.rename(
//           LEADERBOARD_KEYS[category].today,
//           LEADERBOARD_KEYS[category].yesterday
//         );
//         await redisClient.del(LEADERBOARD_KEYS[category].today);
//       }
//     }
  
//     // Reset weekly leaderboard on Monday
//     if (now.day() === 1 && now.hour() === 0 && now.minute() === 0) {
//       for (const category of LEADERBOARD_CATEGORIES) {
//         await redisClient.del(LEADERBOARD_KEYS[category].weekly);
//       }
//     }
//   }
  
//   // Set up a cron job to run resetLeaderboards every minute
// const CronJob = require("cron").CronJob;
// const cronJob = new CronJob("* * * * *", resetLeaderboards, null, true, "UTC");

module.exports = {getLeaderboardFromRedis, formatLeaderboard, initializeLeaderboards, updateCategoryLeaderboard, getUserScoreAndRank, formUserKey};