import { defineStore } from "pinia";
import api from "@/api";
import { flattenSites, setCheckinStatus } from "@/utils";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

export const useCheckinStore = defineStore("checkin", {
  state: () => ({
    checkin: [],
  }),
  actions: {
    async fetchCheckin() {
      try {
        const response = await api.get("/checkin");
        const localCheckin = flattenSites(response.data);
        this.checkin = setCheckinStatus(localCheckin);
        console.log("this.checkin", this.checkin);
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
      return state.checkin.filter(
        (checkin) => userStore.getEnabledSites.find(site => (site.siteId === checkin.SiteId) && site.checkinEnabled)
      )
    },
    getAvailableCheckin: (state) => {
      return state.getEnabledCheckin.filter((checkin) => checkin.availability.isAvailable);
    },
    getCheckedInToday: (state) => {
      return state.checkin.filter((checkin) => !checkin.availability.isAvailable && new Date(checkin.lastVisit).toDateString() === new Date().toDateString()).length;
    },
    getAllCheckin: (state) => {
      return state.checkin;
    },
    getCurrentStreak: (state) => {
      // find the enabled checkin (getEnabledCheckin) with the highest currentStreak
      const enabledCheckin = state.getEnabledCheckin.reduce((longest, current) => {
        return current.currentStreak > longest ? current.currentStreak : longest;
      }, 0);
      return enabledCheckin;
    },
    getMaxStreak: (state) => {
      if (state.checkin.length === 0) return 0;
      
      return state.checkin.reduce((longest, current) => {
        return current.longestStreak > longest ? current.longestStreak : longest;
      }, 0);
    },
    getStreakingSites: (state) => {
      // enabled sites that have a currentStreak > 0
      return state.getEnabledCheckin.filter((checkin) => checkin.currentStreak > 0).length;
    },
  },
});
