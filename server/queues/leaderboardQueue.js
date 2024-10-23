const Bull = require('bull');
const {redisClient, redisConfig} = require('../config/redis');
const { getIOInstance } = require('../config/socket');
const { updateCategoryLeaderboard, getUserScoreAndRank, getLeaderboardFromRedis } = require('../services/leaderboardService');
const leaderboardQueue = new Bull('LeaderboardQueue', redisConfig);

// Process jobs
// Inside your job processing function
leaderboardQueue.process(async (job) => {
  const io = getIOInstance();
  if (io) {
    try {
      const { userId, username, userIcon, createdAt, category, value } = job.data;
      const key = `${userId}:${username}:${userIcon}:${new Date(createdAt).toISOString()}`;

      // Update leaderboards and get user stats as before
      await updateCategoryLeaderboard(redisClient, category, key, value);
      await updateCategoryLeaderboard(redisClient, 'overall', key, value);
      const userStats = await getUserScoreAndRank(redisClient, key);
      const leaderboards = await getLeaderboardFromRedis(redisClient);

      // Use the io instance to emit to the user and all clients
      io.to(userId).emit("user-leaderboard-update", userStats);
      io.emit("leaderboards-update", leaderboards);

      return { success: true };
    } catch (error) {
      console.error("Error processing leaderboard update:", error);
    }
  }
});

module.exports = {leaderboardQueue};