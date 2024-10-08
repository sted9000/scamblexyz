const Bull = require("bull");
const { createRedisClient } = require("./redisConfig");
const { RankedUsers, User } = require("./models");
const moment = require("moment");

const LEADERBOARD_KEYS = {
  ALL_TIME: "leaderboard:all_time",
  WEEKLY: "leaderboard:weekly",
  DAILY_TODAY: "leaderboard:daily:today",
  DAILY_YESTERDAY: "leaderboard:daily:yesterday",
};

/* Setup */
const leaderboardRedisClient = createRedisClient();
const leaderboardQueue = new Bull("leaderboard-updates", {
  createClient: createRedisClient,
});

/* Socket Setup */
function setupWebSocket(io) {
  io.on("connection", (socket) => {
    console.log("New client connected");
    sendLeaderboardsToClient(socket);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
    socket.on("request_leaderboard_update", () => {
      console.log("Client requested leaderboard update");
      sendLeaderboardsToClient(socket);
    });
  });

  leaderboardQueue.process(async (job) => {
    const { userId, username, userIcon, createdAt } = job.data;
    try {
      const key = `${userId}:${username}:${userIcon}:${createdAt}`;
      console.log(`Updating score for user ${username}`);

      // Update all leaderboards
      await Promise.all(
        Object.values(LEADERBOARD_KEYS).map(async (leaderboardKey) => {
          const exists = await leaderboardRedisClient.zscore(
            leaderboardKey,
            key
          );
          if (exists === null) {
            await leaderboardRedisClient.zadd(leaderboardKey, 1, key);
          } else {
            await leaderboardRedisClient.zincrby(leaderboardKey, 1, key);
          }
        })
      );

      await updateLeaderboards(io);
      return { success: true };
    } catch (error) {
      console.error("Error processing leaderboard update:", error);
    }
  });
}

async function updateLeaderboards(io) {
  try {
    const leaderboards = {};
    for (const [name, key] of Object.entries(LEADERBOARD_KEYS)) {
      const leaderboard = await leaderboardRedisClient.zrevrange(
        key,
        0,
        50,
        "WITHSCORES"
      );
      leaderboards[name] = formatLeaderboard(leaderboard);
    }
    io.emit("leaderboards_update", leaderboards);
  } catch (error) {
    console.error("Error updating leaderboards:", error);
  }
}

function formatLeaderboard(leaderboard) {
  const formatted = [];
  for (let i = 0; i < leaderboard.length; i += 2) {
    const [userId, username, userIcon, createdAt] = leaderboard[i].split(":");
    formatted.push({
      userId,
      username,
      userIcon,
      createdAt,
      score: parseInt(leaderboard[i + 1], 10),
      rank: Math.floor(i / 2) + 1,
    });
  }
  return formatted;
}

async function sendLeaderboardsToClient(socket) {
  try {
    const leaderboards = {};
    for (const [name, key] of Object.entries(LEADERBOARD_KEYS)) {
      const leaderboard = await leaderboardRedisClient.zrevrange(
        key,
        0,
        50,
        "WITHSCORES"
      );
      leaderboards[name] = formatLeaderboard(leaderboard);
    }
    console.log("Sending leaderboards to client:", leaderboards);
    socket.emit("leaderboards_update", leaderboards);
  } catch (error) {
    console.error("Error sending leaderboards to client:", error);
  }
}

async function initializeLeaderboardFromDatabase(leaderboardKey) {
  try {
    console.log(`Initializing leaderboard: ${leaderboardKey}`);

    // Query the database to get the top users
    const topUsers = await RankedUsers.findAll({
      order: [["score", "DESC"]],
      limit: 100,
      include: [
        {
          model: User,
          attributes: ["id", "username", "userIcon", "createdAt"],
        },
      ],
    });

    // If there are users, add them to Redis
    if (topUsers.length > 0) {
      const multi = leaderboardRedisClient.multi();

      topUsers.forEach((rankedUser) => {
        const key = `${rankedUser.User.id}:${rankedUser.User.username}:${rankedUser.User.userIcon}:${rankedUser.User.createdAt}`;
        multi.zadd(leaderboardKey, rankedUser.score, key);
      });

      await multi.exec();
      console.log(
        `Leaderboard ${leaderboardKey} initialized with ${topUsers.length} users`
      );
    } else {
      console.log(`No users found for leaderboard: ${leaderboardKey}`);
    }
  } catch (error) {
    console.error(`Error initializing leaderboard ${leaderboardKey}:`, error);
  }
}

async function initializeLeaderboards() {
  console.log("Initializing leaderboards...");
  for (const [name, key] of Object.entries(LEADERBOARD_KEYS)) {
    const leaderboardExists = await leaderboardRedisClient.exists(key);
    if (!leaderboardExists) {
      await initializeLeaderboardFromDatabase(key);
    } else {
      console.log(`Leaderboard ${name} already exists in Redis.`);
    }
  }
  console.log("Leaderboards initialization complete.");
}

// Function to reset daily and weekly leaderboards
async function resetLeaderboards() {
  const now = moment();

  // Reset daily leaderboards
  if (now.hour() === 0 && now.minute() === 0) {
    await leaderboardRedisClient.rename(
      LEADERBOARD_KEYS.DAILY_TODAY,
      LEADERBOARD_KEYS.DAILY_YESTERDAY
    );
    await leaderboardRedisClient.del(LEADERBOARD_KEYS.DAILY_TODAY);
  }

  // Reset weekly leaderboard on Monday
  if (now.day() === 1 && now.hour() === 0 && now.minute() === 0) {
    await leaderboardRedisClient.del(LEADERBOARD_KEYS.WEEKLY);
  }
}

// Set up a cron job to run resetLeaderboards every minute
const CronJob = require("cron").CronJob;
new CronJob("* * * * *", resetLeaderboards, null, true, "UTC");

module.exports = {
  setupWebSocket,
  leaderboardQueue,
  initializeLeaderboards,
};
