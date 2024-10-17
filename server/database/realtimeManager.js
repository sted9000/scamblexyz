const Bull = require("bull");
const { createRedisClient } = require("./redisConfig");

class RealtimeManager {
  constructor() {
    this.databases = new Map();
    this.queues = new Map();
  }

  addDatabase(name, config = {}) {
    const client = createRedisClient(config);
    this.databases.set(name, client);
    return client;
  }

  getDatabase(name) {
    return this.databases.get(name);
  }

  createQueue(name, config = {}) {
    const queue = new Bull(name, {
      createClient: () => createRedisClient(config)
    });
    this.queues.set(name, queue);
    return queue;
  }

  getQueue(name) {
    return this.queues.get(name);
  }

  setupWebSocket(io) {
    io.on("connection", (socket) => {
      console.log("New client connected");
      // Add any common WebSocket logic here
      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }
}

module.exports = new RealtimeManager();