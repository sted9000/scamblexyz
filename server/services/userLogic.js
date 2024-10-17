const realtimeManager = require("../database/realtimeManager");
const moment = require("moment");

/* Setup */
const userRedisClient = realtimeManager.addDatabase("user");
const userQueue = realtimeManager.createQueue("user-updates");
const USER_BONUS_KEY = "user:bonus";
const USER_COUNT_KEY = "user:count";

/* Socket Setup */
function setupUserWebSocket(io) {
  realtimeManager.setupWebSocket(io);

  io.on("connection", (socket) => {

    /*** Setup the user's room ***/
    const userId = socket.handshake.query.userId;
    socket.join(userId); 

    /*** Send the user's bonus to the client ***/
    sendUserBonusToClient(userId, socket);

    /*** Listen for the user's bonus updates ***/
    socket.on("request_user_updates", () => {
      sendUserBonusToClient(userId, socket);
    });
  });

  /*** Process the user's bonus updates ***/
  userQueue.process(async (job) => {
    const { userId, change } = job.data;

    try {
      // Update the user's bonus score in Redis
      await userRedisClient.hincrby(USER_BONUS_KEY, userId, change);
  
      // Update the user's count in Redis
      await userRedisClient.hincrby(USER_COUNT_KEY, userId, 1); // Increment count by 1
  
      // Fetch the updated bonus score and count
      const updatedBonus = await userRedisClient.hget(USER_BONUS_KEY, userId);
      const updatedCount = await userRedisClient.hget(USER_COUNT_KEY, userId); // Fetch count
  
      // Emit the updated bonus score and count to the specific user
      io.to(userId).emit("user_bonus_update", { userId, bonus: updatedBonus, count: updatedCount }); // Include count
  
      return { success: true };
    } catch (error) {
      console.error("Error updating user bonus score:", error);
    }
  });
}

async function sendUserBonusToClient(userId, socket) {
    try {
      const bonus = await userRedisClient.hget(USER_BONUS_KEY, userId);
      const count = await userRedisClient.hget(USER_COUNT_KEY, userId); // Fetch count
      console.log("Sending user bonus and count to client", userId, bonus, count);
      socket.emit("user_bonus_update", { userId, bonus, count }); // Include count
    } catch (error) {
      console.error("Error sending user bonus to client:", error);
    }
}

module.exports = {
  setupUserWebSocket,
  userQueue,
};
