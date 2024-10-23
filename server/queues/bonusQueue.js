const Bull = require('bull');
const {redisClient, redisConfig} = require('../config/redis');
const { getIOInstance } = require('../config/socket');
const { BONUS_KEY_PREFIX, fetchBonusesFromRedis } = require('../services/bonusService');
const bonusQueue = new Bull('BonusQueue', redisConfig);

// Process jobs
// Inside your job processing function
bonusQueue.process(async (job) => {
  const io = getIOInstance();
  if (io) {
    try {
      const bonus = job.data;
      console.log("Handling new bonus");
      // Use the bonus id as the key
      const key = BONUS_KEY_PREFIX + bonus.id; 
      // Turn bonus into a string
      const bonusString = JSON.stringify(bonus);
      // Store the bonus in Redis
      await redisClient.set(key, bonusString); 
      // Expire in 1 week
      await redisClient.expire(key, 604800);
      // Fetch all bonuses from Redis
      const bonuses = await fetchBonusesFromRedis(redisClient);
      // Emit the bonuses to the client
      io.emit("bonus-update", bonuses);
      return { success: true };
    } catch (error) {
      console.error("Error handling new bonus", error);
      return { success: false };
    }
  }

  return job.data;
});

module.exports = {bonusQueue};