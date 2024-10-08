import { defineStore } from "pinia";
import { sites as localSites } from "@/constants";
import api from "@/api";
export const useUserStore = defineStore("user", {
  state: () => ({
    sites: [],
  }),

  getters: {
    getSites: (state) => state.sites,
    getPostcardSites: (state) => state.sites.filter((site) => site.isEnabled && site.isCard),
    
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
    }
  }
});
