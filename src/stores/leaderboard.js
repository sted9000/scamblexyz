// src/stores/leaderboardStore.js
import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => ({
    leaderboards: {
      ALL_TIME: [],
      WEEKLY: [],
      DAILY_TODAY: [],
      DAILY_YESTERDAY: [],
    },
    isConnected: false,
  }),

  getters: {
    bannerPlayers: (state) => {
      return {
        ALL_TIME: state.leaderboards.ALL_TIME.slice(0, 3),
        WEEKLY: state.leaderboards.WEEKLY.slice(0, 3),
        DAILY_TODAY: state.leaderboards.DAILY_TODAY.slice(0, 3),
        DAILY_YESTERDAY: state.leaderboards.DAILY_YESTERDAY.slice(0, 3),
      };
    },
    allTimePlayers: (state) => state.leaderboards.ALL_TIME,
    weeklyPlayers: (state) => state.leaderboards.WEEKLY,
    dailyTodayPlayers: (state) => state.leaderboards.DAILY_TODAY,
    dailyYesterdayPlayers: (state) => state.leaderboards.DAILY_YESTERDAY,
  },

  actions: {
    initializeSocket() {
      this.socket = io("http://localhost:3000", {
        transports: ["websocket", "polling"],
      });

      this.socket.on("connect", () => {
        this.isConnected = true;
        console.log("Connected to server");
      });

      this.socket.on("disconnect", () => {
        this.isConnected = false;
        console.log("Disconnected from server");
      });

      this.socket.on("leaderboards_update", (data) => {
        this.updateLeaderboards(data);
      });
    },

    updateLeaderboards(data) {
      this.leaderboards = data;
    },

    requestLeaderboardUpdate() {
      if (this.isConnected) {
        this.socket.emit("request_leaderboard_update");
      }
    },

    getLeaderboard(type) {
      return this.leaderboards[type] || [];
    },
  },
});
