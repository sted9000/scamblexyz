import { defineStore } from "pinia";
import { sites as localSites } from "@/constants";
import api from "@/api";
import { io } from "socket.io-client";

export const useUserStore = defineStore("user", {
  state: () => ({
    sites: [],
    bonus: 0,
    bonusCount: 0,
    isConnected: false,
  }),

  getters: {
    getSites: (state) => state.sites,
    getEnabledSites: (state) => state.sites.filter((site) => site.isEnabled),
    getPostcardSites: (state) => state.sites.filter((site) => site.isEnabled && site.isCard),
    getBonus: (state) => state.bonus,
    getBonusCount: (state) => state.bonusCount,
  },
  actions: {
    async fetchUserSites() {
      const response = await api.get("/user/sites");
      this.sites = response.data.map((site) => ({ ...site, ...localSites[site.id]}));
    },
    async updateEnabledSites(changedSites) {
      console.log("Changed sites", changedSites);
      try {
        await api.post("/user/sites", {changedSites});
        for (const siteId in changedSites) {
          // Change the type of siteId to integer
          const siteIdInt = parseInt(siteId);
          // update the local sites with the new enabled status
          this.sites = this.sites.map((site) => site.siteId === siteIdInt ? {...site, isEnabled: changedSites[siteId]} : site);
        }
      } catch (error) {
        console.error("Error updating sites:", error);
      }
    },
    initializeSocket() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId
      console.log("Initializing socket for user", userId);
      this.socket = io("http://localhost:3000", {
        transports: ["websocket", "polling"],
        query: { userId: userId },
      });

        this.socket.on('connect', () => {
          console.log('Connected to WebSocket (user)');  
          this.isConnected = true;
        });
  
        this.socket.on('user_bonus_update', (data) => {
          console.log('user_bonus_update', data);
          this.bonus = data.bonus;
          this.bonusCount = data.count;
        });
      },
      requestUserUpdates() {
        if (this.socket) {
          this.socket.emit('request_user_updates');
        }
      },
  }
});
