import { defineStore } from "pinia";
import api from "@/api";
import { sites } from "@/constants";

export const useCheckinStore = defineStore("checkin", {
  state: () => ({
    checkin: [],
  }),
  actions: {
    async fetchCheckin() {
      try {
        const response = await api.get("/checkin");
        this.checkin = response.data;
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    },
    async updateCheckin(checkin) {
      console.log("Updating checkin:", checkin);
      try {
        await api.put(`/checkin`, checkin);
        this.fetchCheckin();
      } catch (error) {
        console.error("Error updating checkin:", error);
      }
    },
  },
  getters: {
    getEnabledCheckin: (state) => {
      const enabledCheckins = state.checkin.filter(
        (checkin) => checkin.enabled
      );
      return enabledCheckins.map((checkin) => {
        return { ...checkin, ...sites[checkin.SiteId] };
      });
    },
    getNumberOfEnabledCheckinSites: (state) => {
      return state.checkin.filter((checkin) => checkin.enabled).length;
    },
    getAllCheckin: (state) => {
      return state.checkin.map((checkin) => {
        return { ...checkin, ...sites[checkin.SiteId] };
      });
    },
    getCurrentStreak: (state) => {
      const enabledCheckins = state.checkin.filter((checkin) => checkin.enabled);
      if (enabledCheckins.length === 0) return 0;
      
      return enabledCheckins.reduce((longest, current) => {
        return current.currentStreak > longest ? current.currentStreak : longest;
      }, 0);
    },
    getMaxStreak: (state) => {
      if (state.checkin.length === 0) return 0;
      
      return state.checkin.reduce((longest, current) => {
        return current.longestStreak > longest ? current.longestStreak : longest;
      }, 0);
    },
    getStreakingSites: (state) => {
      // enabled sites that have a currentStreak > 0
      return state.checkin.filter((checkin) => checkin.enabled && checkin.currentStreak > 0).length; 
    },
    
    getNumberOfCheckinsAvailable: (state) => {
      const availableSites = []
      for (const siteId in state.checkin) {
        if (state.checkin[siteId].lastVisit === null) {
          availableSites.push(state.checkin[siteId]);
        }
        // daily checkins
        else if (state.checkin[siteId].checkinType === "daily") {
          // look at the last checkin date
          const lastVisit = state.checkin[siteId].lastVisit;
          if (lastVisit) {
            const lastVisitDate = new Date(lastVisit);
            const currentDate = new Date();
            // push if the different the last visit date was yesterday
            const timeDifference = currentDate.getTime() - lastVisitDate.getTime();
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            if (daysDifference >= 1) {
              availableSites.push(state.checkin[siteId]);
            }
          }
        
      }
      else if (state.checkin[siteId].checkinType === "hourly") {
        const lastVisit = state.checkin[siteId].lastVisit;
        if (lastVisit) {
          const lastVisitDate = new Date(lastVisit);
          const currentDate = new Date();
          const timeDifference = currentDate.getTime() - lastVisitDate.getTime();
          const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60 * state.checkin[siteId].hourlyCheckinReset));
          if (hoursDifference >= 1) {
            availableSites.push(state.checkin[siteId]);
          }
        }
        }
      }
      return availableSites.length;
    }
  },
});
