const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { syncDatabase } = require("./models");
const http = require("http");
const { Server } = require("socket.io");
const { setupLeaderboardWebSocket, initializeLeaderboards } = require("./services/leaderboardLogic");
const { setupPostcardWebSocket } = require("./services/postcardLogic");
const { setupBonusWebSocket } = require("./services/bonusLogic");
const { setupCheckinWebSocket } = require("./services/checkinLogic");
const { setupUserWebSocket } = require("./services/userLogic");
const {
  authRoutes,
  checkinRoutes,
  bonusRoutes,
  postcardRoutes,
  userRoutes,
} = require("./routes");

/* Basic Config */
const port = process.env.PORT || 3000;
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));

/* Socketio Setup */
const server = http.createServer(app);
const io = new Server(server, {});

/* Routes */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/checkin", checkinRoutes);
app.use("/bonus", bonusRoutes);
app.use("/postcard", postcardRoutes);

/* Websocket Setup */
setupLeaderboardWebSocket(io);
setupPostcardWebSocket(io);
setupBonusWebSocket(io);
setupCheckinWebSocket(io);
setupUserWebSocket(io);
/* Start Server (and sync database) */
async function startServer() {
  await syncDatabase();
  await initializeLeaderboards();

  // Start your server here
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

startServer();
