import { defineStore } from "pinia";
import { sites as localSites } from "@/constants";
import api from "@/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    sites: [],
    isConnected: false,
  }),

  getters: {
    getSites: (state) => state.sites,
    getEnabledSites: (state) => state.sites.filter((site) => site.isEnabled),
    getPostcardSites: (state) => state.sites.filter((site) => site.isEnabled && site.isCard),
  },
  actions: {
    async fetchUserSites() {
      const response = await api.get("/user/sites");
      this.sites = response.data.map((site) => ({ ...site, ...localSites[site.id]}));
    },
    async updateEnabledSite(siteId, updatedProperty) {
      console.log("Updating site", siteId, updatedProperty);
      try {
        await api.post(`/user/site/${siteId}`, updatedProperty);
        this.sites = this.sites.map((site) => site.siteId === siteId ? {...site, ...updatedProperty} : site);
      } catch (error) {
        console.error("Error updating sites:", error);
      }
    },
  }
});
