const realtimeManager = require("../database/realtimeManager");
const { UserScore, User } = require("../models");
const moment = require("moment");

/* Setup */
const leaderboardRedisClient = realtimeManager.addDatabase("leaderboard");
const leaderboardQueue = realtimeManager.createQueue("leaderboard-updates");

const LEADERBOARD_CATEGORIES = ['overall', 'checkin', 'bonus', 'postcard'];
const LEADERBOARD_TYPES = ['all_time', 'weekly', 'today', 'yesterday'];

const LEADERBOARD_KEYS = {};
LEADERBOARD_CATEGORIES.forEach(category => {
  LEADERBOARD_KEYS[category] = {};
  LEADERBOARD_TYPES.forEach(type => {
    LEADERBOARD_KEYS[category][type] = `leaderboard:${category}:${type}`;
  });
});

/* Socket Setup */
function setupLeaderboardWebSocket(io) {
  realtimeManager.setupWebSocket(io);
  io.on("connection", (socket) => {

    /*** Setup the user's room ***/
    const userId = socket.handshake.query.userId;
    socket.join(userId);  

    /*** Send leaderboards to the client ***/
    sendLeaderboardsToClient(socket);

    /*** Send user's leaderboard to the client ***/
    sendUserLeaderboardToClient(userId, socket);

    /*** Listen for leaderboard updates ***/
    socket.on("request_leaderboards_update", () => {
      console.log("Client requested leaderboard update");
      sendLeaderboardsToClient(socket);
    });

    /*** Listen for user's leaderboard updates ***/
    socket.on("request_user_leaderboard_update", () => {
      console.log("Client requested user leaderboard update");
      sendUserLeaderboardToClient(userId, socket);
    });
  });

  /*** Process leaderboard updates ***/
  leaderboardQueue.process(async (job) => {
    const { userId, username, userIcon, createdAt, category, value } = job.data;
    try {
      // make sure the createdAt is in the correct format
      // :Wed Oct 16 2024 15:07:23 GMT-0400 (Eastern Daylight Time)
      const key = `${userId}:${username}:${userIcon}:${new Date(createdAt).toISOString()}`;
      console.log("Key", key);
      console.log(`Updating ${category} score for user ${username} by ${value}`);

      // Update the specific category leaderboard
      await updateCategoryLeaderboard(category, key, value);

      // Update the overall leaderboard
      await updateCategoryLeaderboard('overall', key, value);

      // Get the user's score and rank
      const userStats = await getUserScoreAndRank(key);
      
      // Send the user's score and rank to the client
      io.to(userId).emit("user_leaderboard_update", userStats);

      await updateLeaderboards(io);
      return { success: true };
    } catch (error) {
      console.error("Error processing leaderboard update:", error);
    }
  });
}

async function sendUserLeaderboardToClient(userId, socket) {
  const user = await User.findByPk(userId);
  const key = `${userId}:${user.username}:${user.userIcon}:${new Date(user.createdAt).toISOString()}`;
  const userStats = await getUserScoreAndRank(key);
  socket.emit("user_leaderboard_update", userStats);
}

async function getUserScoreAndRank(key) {
  const userOverallScore = await leaderboardRedisClient.zscore(LEADERBOARD_KEYS.overall.all_time, key);
  const userOverallRank = await leaderboardRedisClient.zrevrank(LEADERBOARD_KEYS.overall.all_time, key);
  const userCheckinScore = await leaderboardRedisClient.zscore(LEADERBOARD_KEYS.checkin.all_time, key);
  const userCheckinRank = await leaderboardRedisClient.zrevrank(LEADERBOARD_KEYS.checkin.all_time, key);
  const userBonusScore = await leaderboardRedisClient.zscore(LEADERBOARD_KEYS.bonus.all_time, key);
  const userBonusRank = await leaderboardRedisClient.zrevrank(LEADERBOARD_KEYS.bonus.all_time, key);
  const userPostcardScore = await leaderboardRedisClient.zscore(LEADERBOARD_KEYS.postcard.all_time, key);
  const userPostcardRank = await leaderboardRedisClient.zrevrank(LEADERBOARD_KEYS.postcard.all_time, key);
  return { userOverallScore, userOverallRank, userCheckinScore, userCheckinRank, userBonusScore, userBonusRank, userPostcardScore, userPostcardRank };
}

async function updateCategoryLeaderboard(category, key, value) {
  console.log("Updating category leaderboard", category, key, value);
  await Promise.all(
    Object.values(LEADERBOARD_KEYS[category]).map(async (leaderboardKey) => {
      await leaderboardRedisClient.zincrby(leaderboardKey, value, key);
    })
  );
}

async function updateLeaderboards(io) {
  try {
    const leaderboards = {};
    for (const category of LEADERBOARD_CATEGORIES) {
      leaderboards[category] = {};
      for (const [type, key] of Object.entries(LEADERBOARD_KEYS[category])) {
        const leaderboard = await leaderboardRedisClient.zrevrange(
          key,
          0,
          50,
          "WITHSCORES"
        );
        leaderboards[category][type] = formatLeaderboard(leaderboard);
      }
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
    for (const category of LEADERBOARD_CATEGORIES) {
      leaderboards[category] = {};
      for (const [type, key] of Object.entries(LEADERBOARD_KEYS[category])) {
        const leaderboard = await leaderboardRedisClient.zrevrange(
          key,
          0,
          50,
          "WITHSCORES"
        );
        leaderboards[category][type] = formatLeaderboard(leaderboard);
      }
    }
    socket.emit("leaderboards_update", leaderboards);
  } catch (error) {
    console.error("Error sending leaderboards to client:", error);
  }
}

async function initializeLeaderboardFromDatabase(category, leaderboardKey) {
  try {
    console.log(`Initializing ${category} leaderboard: ${leaderboardKey}`);

    // Query the database to get the top users for the specific category
    const topUsers = await UserScore.findAll({
      order: [[`${category}Score`, 'DESC']],
      limit: 100,
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'userIcon', 'createdAt'],
        },
      ],
    });

    // If there are users, add them to Redis
    if (topUsers.length > 0) {
      const multi = leaderboardRedisClient.multi();

      topUsers.forEach((userScore) => {
        const key = `${userScore.User.id}:${userScore.User.username}:${userScore.User.userIcon}:${userScore.User.createdAt}`;
        multi.zadd(leaderboardKey, userScore[`${category}Score`], key);
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
  for (const category of LEADERBOARD_CATEGORIES) {
    for (const [type, key] of Object.entries(LEADERBOARD_KEYS[category])) {
      const leaderboardExists = await leaderboardRedisClient.exists(key);
      if (!leaderboardExists) {
        await initializeLeaderboardFromDatabase(category, key);
      } else {
        console.log(`Leaderboard ${category}:${type} already exists in Redis.`);
      }
    }
  }
  console.log("Leaderboards initialization complete.");
}

// Function to reset daily and weekly leaderboards
async function resetLeaderboards() {
  const now = moment();

  // Reset daily leaderboards
  if (now.hour() === 0 && now.minute() === 0) {
    for (const category of LEADERBOARD_CATEGORIES) {
      await leaderboardRedisClient.rename(
        LEADERBOARD_KEYS[category].today,
        LEADERBOARD_KEYS[category].yesterday
      );
      await leaderboardRedisClient.del(LEADERBOARD_KEYS[category].today);
    }
  }

  // Reset weekly leaderboard on Monday
  if (now.day() === 1 && now.hour() === 0 && now.minute() === 0) {
    for (const category of LEADERBOARD_CATEGORIES) {
      await leaderboardRedisClient.del(LEADERBOARD_KEYS[category].weekly);
    }
  }
}

// Set up a cron job to run resetLeaderboards every minute
const CronJob = require("cron").CronJob;
new CronJob("* * * * *", resetLeaderboards, null, true, "UTC");

module.exports = {
  setupLeaderboardWebSocket,
  leaderboardQueue,
  initializeLeaderboards,
};