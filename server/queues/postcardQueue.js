const Bull = require('bull');
const {redisClient, redisConfig} = require('../config/redis');
const { getIOInstance } = require('../config/socket');
const { fetchPostcardDropsFromRedis } = require('../services/postcardService');
const moment = require('moment');
const postcardQueue = new Bull('PostcardQueue', redisConfig);

// Process jobs
// Inside your job processing function
postcardQueue.process(async (job) => {
  const io = getIOInstance();
  if (io) {
    try {
      const { dropId, dropDate, siteId, source } = job.data;
    
      // remove the time from the drop date
      const dropDateWithoutTime = moment(dropDate).format("YYYY-MM-DD");
      const key = `${dropId}:${dropDateWithoutTime}:${siteId}:${source}`;
      const score = moment(dropDateWithoutTime).valueOf();

      // add to redis
      await redisClient.zadd(POSTCARD_DROPS_KEY, score, key);
  
      // get the data from redis
      const drops = await fetchPostcardDropsFromRedis(redisClient);
  
      // send the data to the client
      io.emit("postcard-drops-update", drops);

      return { success: true };
    } catch (error) {
      console.error("Error processing postcard drop:", error);
    }
  }
});

module.exports = {postcardQueue};
