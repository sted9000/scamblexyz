const realtimeManager = require("../database/realtimeManager");
const moment = require("moment");

/* Setup */
const postcardRedisClient = realtimeManager.addDatabase("postcard");
const postcardQueue = realtimeManager.createQueue("postcard-updates");
const POSTCARD_DROPS_KEY = "postcard:drops";

/* Socket Setup */
function setupPostcardWebSocket(io) {
  realtimeManager.setupWebSocket(io);

  io.on("connection", (socket) => {
    sendPostcardDropsToClient(socket);
    socket.on("request_postcard_drops", () => {
      console.log("Client requested postcard drops");
      sendPostcardDropsToClient(socket);
    });
  });

  postcardQueue.process(async (job) => {
    const { dropId, dropDate, siteId, source } = job.data;
    console.log("Processing postcard drop:", dropId, dropDate, siteId, source);
    try {
      // remove the time from the drop date
      const dropDateWithoutTime = moment(dropDate).format("YYYY-MM-DD");
      const key = `${dropId}:${dropDateWithoutTime}:${siteId}:${source}`;
      const score = moment(dropDateWithoutTime).valueOf();

      // add to redis
      await postcardRedisClient.zadd(POSTCARD_DROPS_KEY, score, key);

      // get the data from redis
      const drops = await fetchPostcardDropsFromRedis(io);

      // send the data to the client
      io.emit("postcard_drops_update", drops);

      return { success: true };
    } catch (error) {
      console.error("Error processing leaderboard update:", error);
    }
  });
}

async function fetchPostcardDropsFromRedis() {
  try {
    const drops = await postcardRedisClient.zrevrange(
        POSTCARD_DROPS_KEY,
        0,
        50,
        "WITHSCORES"
    );
    return formatDrops(drops);
  } catch (error) {
    console.error("Error updating leaderboards:", error);
  }
}

function formatDrops(drops) {
  const formatted = [];
  for (let i = 0; i < drops.length; i += 2) {
    const [dropId, dropDate, siteId, source] = drops[i].split(":");
    formatted.push({
      dropId,
      dropDate,
      siteId,
      source,
    });
  }
  return formatted;
}

async function sendPostcardDropsToClient(socket) {
  try {
    const drops = await fetchPostcardDropsFromRedis();
    socket.emit("postcard_drops_update", drops);
  } catch (error) {
    console.error("Error sending postcard drops to client:", error);
  }
}

module.exports = {
  setupPostcardWebSocket,
  postcardQueue,
};
