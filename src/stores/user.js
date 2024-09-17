import { defineStore } from "pinia";
import { getCurrentUser, signOut, signInWithRedirect } from "aws-amplify/auth";
import { authenticatedApiCall, handleError } from "@/apiService";
import { sites as localSites } from "@/constants";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    sites: [],
    isAuthenticated: false,
    isLoading: true,
    isLoggingOut: false,
    backendUserData: null,
    backendUserDataFetched: false,
    error: null,
  }),

  getters: {
    // Add any getters you need
    // isSubscribed: (state) => {
    //   return state.backendUserData?.subscribed ?? false;
    // },
    getSites: (state) => {
      return state.sites ?? [];
    },
    getIsLoading: (state) => {
      return state.initialLoad;
    },
    getIsLoggingOut: (state) => {
      return state.isLoggingOut;
    },
    getCardSites: (state) => {
      return (state.sites ?? []).filter((site) => site.isCard);
    },
    enabledSites: (state) => {
      return (state.sites ?? []).filter((site) => site.enabled);
    },
    userScore: (state) => {
      return state.backendUserData?.score ?? 0;
    },
    userRank: (state) => {
      return state.backendUserData?.rank ?? 0;
    },
    userIcon: (state) => {
      return state.backendUserData?.icon ?? "user";
    },
    userName: (state) => {
      return state.backendUserData?.username ?? "User";
    },
  },

  actions: {
    async checkUser() {
      this.error = null;
      try {
        const user = await getCurrentUser();
        this.user = { ...user };
        this.isAuthenticated = true;
        if (this.isAuthenticated && !this.backendDataFetched) {
          await this.fetchBackendUserData();
        }
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        this.backendUserData = null;
        this.error = "Failed to authenticate user";
        console.error("Failed to authenticate user:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async signIn() {
      try {
        await signInWithRedirect({
          provider: "Google",
        });
      } catch (error) {
        console.error("Sign-in failed:", error);
        this.error = "Sign-in failed";
        throw error;
      }
    },

    async signOut() {
      try {
        this.isLoggingOut = true;
        await signOut();
        this.user = null;
        this.isAuthenticated = false;
        this.backendUserData = null;
        this.error = null;
      } catch (error) {
        console.error("Sign-out failed:", error);
        this.error = "Sign-out failed";
        throw error;
      }
    },

    async updateUserSite(item) {
      if (!this.isAuthenticated) {
        console.error("User is not authenticated");
        this.error = "User is not authenticated";
        return;
      }
      try {
        const response = await authenticatedApiCall("put", "/user", item);
        // update the site in the state 'sites' array
        console.log("Response data:", response.data);
        const siteIndex = this.sites.findIndex((site) => site.SK === item.SK);
        console.log("Site index:", siteIndex);
        this.sites[siteIndex] = {
          ...response.data.site,
          ...localSites[item.SK],
        };
        this.backendUserData.score = response.data.score;
        console.log("Updated sites data:", this.sites);

        this.error = null;
      } catch (error) {
        this.error = handleError(error, "Failed to $ user site:");
      }
    },

    async updateEnabledSites(changedSites) {
      // API call to update sites
      await authenticatedApiCall("PATCH", "/site", changedSites);
      // Update local state
      this.sites = this.sites.map((site) => {
        if (site.SK in changedSites) {
          return { ...site, enabled: changedSites[site.SK] };
        }
        return site;
      });
    },

    async fetchBackendUserData() {
      if (!this.isAuthenticated) {
        console.error("User is not authenticated");
        this.error = "User is not authenticated";
        return;
      }
      this.initialLoad = true;
      try {
        const response = await authenticatedApiCall("GET", "/user");
        this.backendUserData = response.data.user;
        console.log("SITES:", response.data.sites);
        let fetchedSites = response.data.sites;
        fetchedSites = fetchedSites.map((site) => {
          return { ...site, ...localSites[site.SK] };
        });
        this.sites = fetchedSites;
        this.backendUserDataFetched = true;
        this.error = null;
      } catch (error) {
        this.error = handleError(error, "Failed to fetch backend user data:");
      } finally {
        this.initialLoad = false;
        this.isLoading = false;
      }
    },

    async setEditProfile(body) {
      if (!this.isAuthenticated) {
        console.error("User is not authenticated");
        this.error = "User is not authenticated";
        return;
      }
      try {
        console.log("Body:", body);
        const response = await authenticatedApiCall("PATCH", "/user", body);
        this.backendUserData = response.data;
        this.error = null;
      } catch (error) {
        this.error = handleError(error, "Failed to update user profile:");
      }
    },

    async refreshBackendUserData() {
      this.backendDataFetched = false;
      await this.fetchBackendUserData();
    },
  },
});
