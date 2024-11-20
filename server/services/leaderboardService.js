const { UserScore, User } = require('../models');
const schedule = require('node-schedule');
const { redisClient } = require('../config/redis');

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
    return { 
      userOverallScore, 
      userOverallRank: userOverallRank + 1, 
      userCheckinScore, 
      userCheckinRank: userCheckinRank + 1, 
      userBonusScore, 
      userBonusRank: userBonusRank + 1, 
      userPostcardScore, 
      userPostcardRank: userPostcardRank + 1, 
      userOverallTodayScore, 
      userCheckinTodayScore, 
      userBonusTodayScore, 
      userPostcardTodayScore 
    };
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

const dailyRedisLeaderboardsUpdate = async () => {
  /*** Daily moving of 'todays' leaderboards to 'yesterdays' leaderboards ***/
  schedule.scheduleJob('0 0 * * *', async () => {
    console.log('Starting daily database update job...');
    try {
      for (const category of LEADERBOARD_CATEGORIES) {
        // Move the 'today' leaderboard to the 'yesterday' leaderboard
      await redisClient.rename(LEADERBOARD_KEYS[category].today, LEADERBOARD_KEYS[category].yesterday);
      // Delete the 'today' leaderboard
        await redisClient.del(LEADERBOARD_KEYS[category].today);
      }
    } catch (error) {
      console.error('Error updating daily Redis leaderboards:', error);
    }
  });
}

const weeklyRedisLeaderboardsUpdate = async () => {
  /*** Each monday morning at 00:00:00 UTC, reset the weekly leaderboards ***/
  schedule.scheduleJob('0 0 * * 1', async () => {
    console.log('Starting weekly database update job...');
    try {
      for (const category of LEADERBOARD_CATEGORIES) {
        // remove all items from the weekly leaderboard
        await redisClient.del(LEADERBOARD_KEYS[category].weekly);
      }
    } catch (error) {
      console.error('Error updating weekly Redis leaderboards:', error);
    }
  });
}

module.exports = {getLeaderboardFromRedis, formatLeaderboard, initializeLeaderboards, updateCategoryLeaderboard, getUserScoreAndRank, formUserKey, dailyRedisLeaderboardsUpdate, weeklyRedisLeaderboardsUpdate};