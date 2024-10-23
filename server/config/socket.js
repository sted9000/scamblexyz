// socket.js
const { getLeaderboardFromRedis, getUserScoreAndRank, formUserKey } = require('../services/leaderboardService');
const { fetchBonusesFromRedis } = require('../services/bonusService');
const { redisClient } = require('./redis');
const moment = require('moment');
let ioInstance = null;

function initializeSocket(server) {
  const { Server } = require("socket.io");
  const io = new Server(server, {});
  ioInstance = io;

  io.on('connection', async (socket) => {
    console.log('Socket.IO client connected.');

    /*** Setup the user's room to listen for personal updates ***/
    const userId = socket.handshake.query.userId;
    console.log("User joined room", userId);
    socket.join(userId);

    /*** Send the leaderboard to the client ***/
    const leaderboards = await getLeaderboardFromRedis(redisClient);
    socket.emit('leaderboards-update', leaderboards);

    /*** Send the bonuses to the client ***/
    const bonuses = await fetchBonusesFromRedis(redisClient);
    socket.emit('bonus-update', bonuses);

    /*** Send the checkin update to the client ***/
    const todaysCheckins = await redisClient.get(`checkins:${moment().format("YYYY-MM-DD")}`);
    const yesterdaysCheckins = await redisClient.get(`checkins:${moment().subtract(1, "day").format("YYYY-MM-DD")}`); 
    socket.emit('checkin-update', { 
      today: todaysCheckins, 
      yesterday: yesterdaysCheckins
    });

    /*** Send the user's leaderboard to the client ***/
    const userKey = await formUserKey(userId);
    const userLeaderboard = await getUserScoreAndRank(redisClient, userKey);
    io.to(userId).emit('user-leaderboard-update', userLeaderboard);

    socket.on('disconnect', () => {
      console.log('Socket.IO client disconnected.');
    });
  });

  return io;
}

function getIOInstance() {
  return ioInstance;
}

module.exports = { initializeSocket, getIOInstance };
