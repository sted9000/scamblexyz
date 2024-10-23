const BONUS_KEY_PREFIX = "bonus:";

const fetchBonusesFromRedis = async (redisClient) => {
  try {
      // Fetch all bonus keys
      const keys = await redisClient.keys(`${BONUS_KEY_PREFIX}*`); 
      // Get all bonuses
      const bonuses = await Promise.all(keys.map(key => redisClient.get(key))); 
      // Format the bonuses
      const formattedBonuses = bonuses.map(bonus => {
          const bonusObject = JSON.parse(bonus);
          return bonusObject;
      });
      // Return the formatted bonuses
      return formattedBonuses;
  } catch (error) {
      console.error("Error updating bonus drops:", error);
  }
}


module.exports = { BONUS_KEY_PREFIX, fetchBonusesFromRedis };