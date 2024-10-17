const realtimeManager = require("../database/realtimeManager");
const moment = require("moment");

/* Setup */
const checkinRedisClient = realtimeManager.addDatabase("checkin");
const checkinQueue = realtimeManager.createQueue("checkin-updates");

/* Socket Setup */
function setupCheckinWebSocket(io) {
  realtimeManager.setupWebSocket(io);

  io.on("connection", (socket) => {
    sendCheckinsToClient(socket);
    socket.on("request_checkins", () => {
      sendCheckinsToClient(socket);
    });
  });

  checkinQueue.process(async (job) => {
    try {
      // get the current date
      const today = moment().format("YYYY-MM-DD");

      // increment the checkin count (total_checkins)
      await checkinRedisClient.incr(`checkins:${today}`);

      // send the checkin update to the client
      await sendCheckinsToClient(io);

      return { success: true };
    } catch (error) {
      console.error("Error processing checkin update:", error);
    }
  });
}

async function sendCheckinsToClient(socket) {
  try {
    // get the current date
    const today = moment().format("YYYY-MM-DD");

    // get the checkin count for today and yesterday
    const todaysCheckins = await checkinRedisClient.get(`checkins:${today}`);
    const yesterdaysCheckins = await checkinRedisClient.get(`checkins:${moment().subtract(1, "day").format("YYYY-MM-DD")}`);

    // send the data to the client
    console.log("Sending checkins to client", { today: todaysCheckins, yesterday: yesterdaysCheckins});
    socket.emit("checkin-update", { today: todaysCheckins, yesterday: yesterdaysCheckins});
  } catch (error) {
    console.error("Error sending checkins to client:", error);
  }
}

module.exports = {
  setupCheckinWebSocket,
  checkinQueue,
};
