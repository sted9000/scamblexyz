import { defineStore } from "pinia";
import {
  getCurrentUser,
  signOut,
  signInWithRedirect,
  fetchAuthSession,
} from "aws-amplify/auth";
import axios from "axios";
import router from "@/router";

// Helper function to make authenticated API calls
const authenticatedApiCall = async (method, path, data = null) => {
  const baseUrl = `https://${process.env.VUE_APP_CLOUDFRONTAPIORIGINDOMAINNAME}/${process.env.VUE_APP_APIGATEWAYDEPLOYEDSTAGENAME}`;
  const { tokens } = await fetchAuthSession();
  const idToken = tokens.idToken.toString();
  console.log(`Making ${method} request to ${baseUrl}${path}`);
  return axios({
    method,
    url: `${baseUrl}${path}`,
    data,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
};

// Helper function to handle errors
const handleError = (error, customMessage) => {
  console.error(customMessage, error);
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return `Server error: ${error.response.status} - ${error.response.data}`;
    } else if (error.request) {
      return "No response received from server";
    } else {
      return "Error setting up the request";
    }
  } else {
    return "An unexpected error occurred";
  }
};

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    backendUserData: null,
    backendUserDataFetched: false,
    error: null,
  }),

  getters: {
    // Add any getters you need
    isSubscribed: (state) => {
      return state.backendUserData?.subscribed ?? false;
    },
  },

  actions: {
    async checkUser() {
      console.log("Checking user...");
      this.isLoading = true;
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

    async fetchBackendUserData() {
      if (!this.isAuthenticated) {
        console.error("User is not authenticated");
        this.error = "User is not authenticated";
        return;
      }

      try {
        const response = await authenticatedApiCall("get", "/user");
        this.backendUserData = response.data;
        this.backendDataFetched = true;
        console.log("Backend user data:", this.backendUserData);
        this.error = null;
      } catch (error) {
        this.error = handleError(error, "Failed to fetch backend user data:");
      }
    },

    async refreshBackendUserData() {
      this.backendDataFetched = false;
      await this.fetchBackendUserData();
    },

    async subscribeFreeUser() {
      if (!this.isAuthenticated) {
        console.error("User is not authenticated");
        this.error = "User is not authenticated";
        return;
      }

      try {
        const response = await authenticatedApiCall("put", "/user");
        const { updatedUser } = response.data;
        console.log("Updated user:", updatedUser);
        this.backendUserData = updatedUser;
        router.push("/app");
        console.log("Backend user data:", this.backendUserData);
        this.error = null;
      } catch (error) {
        this.error = handleError(error, "Failed to subscribe free user:");
      }
    },

    async subscribePremiumUser() {
      if (!this.isAuthenticated) {
        console.error("User is not authenticated");
        this.error = "User is not authenticated";
        return;
      }

      // first get the checkout session URL from my backend
      const response = await authenticatedApiCall(
        "post",
        "/stripe/create-session"
      );
      const { sessionUrl } = response.data;
      console.log("Checkout session URL:", sessionUrl);
      // then redirect the user to this URL to complete the subscription
      window.location.href = sessionUrl;
    },

    async veryifySubscription() {
      // Polling the backend to verify the subscription status
      if (!this.isAuthenticated) {
        this.error = "User is not authenticated";
        return;
      }
      try {
        let retries = 0;
        let isSubscribed = false;
        while (retries < 5) {
          const response = await authenticatedApiCall(
            "post",
            "/stripe/verify-subscription"
          );
          isSubscribed = response.data.subscribed;
          if (isSubscribed) {
            console.log("User is subscribed");
            this.backendUserData = response.data;
            this.error = null;
            return;
          }
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }
        console.log("User is not subscribed");
        this.error = "User is not subscribed";
      } catch (error) {
        this.error = handleError(error, "Failed to verify subscription:");
      }
    },
  },
});
