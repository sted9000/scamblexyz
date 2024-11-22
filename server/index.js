const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { syncDatabase } = require("./models");
const { initializeSocket } = require('./config/socket');
const { initializeLeaderboards } = require('./services/leaderboardService');
const { redisClient } = require('./config/redis');
const { dailyPostcardSiteRatingsUpdate } = require('./services/postcardService');
const { dailyRedisLeaderboardsUpdate, weeklyRedisLeaderboardsUpdate } = require('./services/leaderboardService');
const {
  authRoutes,
  checkinRoutes,
  bonusRoutes,
  postcardRoutes,
  userRoutes,
} = require("./routes");

/* Basic Config */
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// Cors setup
const allowedOrigin = 'https://scamble.xyz';
const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // If you need to send cookies or authentication headers
};

app.use(cors(corsOptions));

// Start scheduled tasks
dailyPostcardSiteRatingsUpdate();
dailyRedisLeaderboardsUpdate();
weeklyRedisLeaderboardsUpdate();

/* Socketio Setup */
const server = http.createServer(app);
initializeSocket(server);

/* Routes */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/checkin", checkinRoutes);
app.use("/bonus", bonusRoutes);
app.use("/postcard", postcardRoutes);

/* Start Server (and sync database) */
async function startServer() {
  await syncDatabase();
  await initializeLeaderboards(redisClient);
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

startServer();
