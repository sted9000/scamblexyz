const Bull = require('bull');
const {redisClient, redisConfig} = require('../config/redis');
const { getIOInstance } = require('../config/socket');
const moment = require('moment')
const checkinQueue = new Bull('CheckinQueue', redisConfig);

// Process jobs
// Inside your job processing function
checkinQueue.process(async (job) => {
  const io = getIOInstance();
  if (io) {
    try {
      // get the current date
      const today = moment().format("YYYY-MM-DD");

      // increment the checkin count (total_checkins)
      await redisClient.incr(`checkins:${today}`);

    
      // get the checkin count for today and yesterday
      const todaysCheckins = await redisClient.get(`checkins:${today}`);
      const yesterdaysCheckins = await redisClient.get(`checkins:${moment().subtract(1, "day").format("YYYY-MM-DD")}`);

      // send the checkin update to the client
      io.emit("checkin-update", { 
        today: todaysCheckins, 
        yesterday: yesterdaysCheckins
      });

      return { success: true };
    } catch (error) {
      console.error("Error processing leaderboard update:", error);
    }
  }
});

module.exports = {checkinQueue};
