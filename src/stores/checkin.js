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
    getAllCheckin: (state) => {
      return state.checkin.map((checkin) => {
        return { ...checkin, ...sites[checkin.SiteId] };
      });
    },
  },
});
