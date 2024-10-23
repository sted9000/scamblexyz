const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { syncDatabase } = require("./models");
const { initializeSocket } = require('./config/socket');
const { initializeLeaderboards } = require('./services/leaderboardService');
const { redisClient } = require('./config/redis');

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
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

/* Socketio Setup */
const server = http.createServer(app);
initializeSocket(server);  // Initialize Socket.IO

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