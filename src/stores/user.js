import { defineStore } from "pinia";
import api from "@/api";
import { flattenSites } from "@/utils";

export const useUserStore = defineStore("user", {
  state: () => ({
    sites: [],
    isConnected: false,
  }),

  getters: {
    getSites: (state) => {
      // Sort the sites alphabetically by name
      return state.sites.sort((a, b) => a.fullName.localeCompare(b.fullName));
    },
    getEnabledSites: (state) => {
      // enabled and sort alphabetically
      return state.sites.filter((site) => site.isEnabled).sort((a, b) => a.fullName.localeCompare(b.fullName));
    },
    getSiteById: (state) => (siteId) => state.sites.find((site) => site.siteId === siteId),
    getPostcardSites: (state) => state.sites.filter((site) => site.isEnabled && site.postcardEnabled && site.isPostcard),
  },
  actions: {
    async fetchUserSites() {
      const response = await api.get("/user/sites");
      // map imagePath to the full path
      this.sites = flattenSites(response.data);
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
