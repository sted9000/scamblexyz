// socket.js
const { getLeaderboardFromRedis, getUserScoreAndRank, formUserKey } = require('../services/leaderboardService');
const { redisClient } = require('./redis');
const moment = require('moment');
const { CommunityBonus, Site } = require('../models');
let ioInstance = null;

function initializeSocket(server, corsOptions) {
  const { Server } = require("socket.io");
  const io = new Server(server, { 
    cors: corsOptions, // Add some recommended Socket.IO-specific settings
    pingTimeout: 60000, // How long to wait before considering connection closed
    pingInterval: 25000, // How often to ping the client
    transports: ['websocket', 'polling'], // Prefer WebSocket, fallback to polling
    allowEIO3: true // Enable Engine.IO v3 transport
  });
  ioInstance = io;

  io.engine.on("connection_error", (err) => {
    console.log('Socket.IO connection error:', err);
  }); 

  io.on('connection', async (socket) => {
    console.log('Socket.IO client connected.');

    // // Add error handling for individual sockets
    // socket.on('error', (error) => {
    //   console.error('Socket error:', error);
    // });

    // // Add authentication check if needed
    // const userId = socket.handshake.query.userId;
    // if (!userId) {
    //   console.log('Connection rejected - no userId provided');
    //   socket.disconnect(true);
    //   return;
    // }

    /*** Setup the user's room to listen for personal updates ***/
    const userId = socket.handshake.query.userId;
    console.log("User joined room", userId);
    socket.join(userId);

    /*** Send the leaderboard to the client ***/
    const leaderboards = await getLeaderboardFromRedis(redisClient);
    socket.emit('leaderboards-update', leaderboards);

    /*** Send the bonuses to the client ***/
    const bonuses = await CommunityBonus.findAll({
      include: [{
        model: Site,
        attributes: ["imagePath", "fullName", "isPostcard"],
      }]
    });
    socket.emit('bonus-update', bonuses);

    /*** Send the bonus claim update to the client ***/
    const todaysBonuses = await redisClient.get(`bonuses:${moment().format("YYYY-MM-DD")}`);
    const yesterdaysBonuses = await redisClient.get(`bonuses:${moment().subtract(1, "day").format("YYYY-MM-DD")}`);
    socket.emit('bonus-claim-update', { 
      today: todaysBonuses, 
      yesterday: yesterdaysBonuses
    });

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
