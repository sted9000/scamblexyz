import { defineStore } from "pinia";
import { authenticatedApiCall, handleError } from "../apiService";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => ({
    leaderboard: [],
    initialLoad: true,
  }),
  getters: {
    getLeaderboard: (state) => {
      return state.leaderboard ?? [];
    },
    getLoading: (state) => {
      return state.initialLoad;
    },
  },
  actions: {
    async fetchLeaderboard() {
      try {
        const response = await authenticatedApiCall("GET", "/leaderboard");
        this.leaderboard = response.data;
        this.initialLoad = false;
      } catch (error) {
        handleError(error);
      }
    },
    pollLeaderboard(interval = 30000) {
      this.fetchLeaderboard();
      setInterval(() => this.fetchLeaderboard(), interval);
    },
  },
});
