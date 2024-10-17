const realtimeManager = require("../database/realtimeManager");

/* Setup */
const bonusRedisClient = realtimeManager.addDatabase("bonus");
const bonusQueue = realtimeManager.createQueue("bonus-updates");
const BONUS_KEY_PREFIX = "bonus:";

/* Socket Setup */
function setupBonusWebSocket(io) {
  realtimeManager.setupWebSocket(io);

  io.on("connection", (socket) => {
    sendBonusesToClient(socket);
    socket.on("request_bonus_update", () => {
      console.log("Client requested bonuses");
      sendBonusesToClient(socket);
    });
  });

  /* Queue Setup */
  bonusQueue.process(async (job) => {
    console.log("Processing bonus job");
    const bonus = job.data;
    return await handleBonus(bonus, io);
  });
}

async function handleBonus(bonus, io) {
  try {
      console.log("Handling new bonus");
      // Use the bonus id as the key
      const key = BONUS_KEY_PREFIX + bonus.id; 
      // Turn bonus into a string
      const bonusString = JSON.stringify(bonus);
      // Store the bonus in Redis
      await bonusRedisClient.set(key, bonusString); 
      // Expire in 1 week
      await bonusRedisClient.expire(key, 604800);
      // Fetch all bonuses from Redis
      const bonuses = await fetchBonusesFromRedis(io);
      // Emit the bonuses to the client
      io.emit("bonus_update", bonuses);
      return { success: true };
  } catch (error) {
      console.error("Error handling new bonus", error);
      return { success: false };
  }
}

async function fetchBonusesFromRedis() {
  try {
      // Fetch all bonus keys
      const keys = await bonusRedisClient.keys(`${BONUS_KEY_PREFIX}*`); 
      // Get all bonuses
      const bonuses = await Promise.all(keys.map(key => bonusRedisClient.get(key))); 
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

async function sendBonusesToClient(socket) {
  try {
    const bonuses = await fetchBonusesFromRedis();
    socket.emit("bonus_update", bonuses);
  } catch (error) {
    console.error("Error sending bonus drops to client:", error);
  }
}

module.exports = {
  setupBonusWebSocket,
  bonusQueue,
};