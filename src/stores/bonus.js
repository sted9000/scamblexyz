import { defineStore } from "pinia";
import { sites } from "@/constants";
import api from "@/api";

export const useBonusStore = defineStore("bonus", {
  state: () => ({
    communityBonus: [],
    userBonus: [],
  }),
  getters: {
    getCommunityBonus: (state) => {
      // Community bonuses that were added today
      return state.communityBonus
        .map((bonus) => ({
          ...bonus,
          ...sites[bonus.siteId],
        }));
    },
    getUserBonus: (state) =>
      state.userBonus.map((bonus) => ({
        ...bonus,
        ...sites[bonus.siteId],
      })),
    getWeeklyBonus: (state) =>
      // sum the weekly bonuses (amount property)
      state.userBonus.reduce((total, bonus) => {
        if (
          new Date(bonus.datetime) >
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        ) {
          return total + bonus.amount;
        }
        return total;
      }, 0),
    getYearlyBonus: (state) =>
      // sum the yearly bonuses (amount property)
      state.userBonus.reduce((total, bonus) => {
        if (
          new Date(bonus.datetime) >
          new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
        ) {
          return total + bonus.amount;
        }
        return total;
      }, 0),
  },
  actions: {
    async fetchCommunityBonus() {
      try {
        const response = await api.get("/bonus/community");
        this.communityBonus = response.data;
      } catch (error) {
        console.error("Error fetching community bonus:", error);
      }
    },
    async fetchUserBonus() {
      try {
        const response = await api.get("/bonus/user");
        this.userBonus = response.data;
      } catch (error) {
        console.error("Error fetching user bonus:", error);
      }
    },
    async addBonus(bonus) {
      try {
        const response = await api.post("/bonus", bonus);
        console.log("response", response);
        // add the new bonus to the userBonus array
        this.userBonus.push(response.data);
      } catch (error) {
        console.error("Error adding bonus:", error);
      }
    },
    async updateBonus(id) {
      try {
        const response = await api.put(`/bonus/${id}`);
        // update the bonus in the userBonus array
        const index = this.userBonus.findIndex((b) => b.id === id);
        this.userBonus[index] = response.data;
      } catch (error) {
        console.error("Error updating bonus:", error);
      }
    },
  },
});
