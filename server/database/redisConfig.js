const Redis = require("ioredis");

const redisOptions = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
};

const createRedisClient = () => {
  const client = new Redis(redisOptions);
  client.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });
  return client;
};

module.exports = {
  createRedisClient,
  redisOptions,
};
