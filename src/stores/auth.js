import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import {jwtDecode} from "jwt-decode";
import api from "@/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null,
    isAuthenticated: false,
  }),

  getters: {
    getUsername: (state) => state.user.username,
    getUserIcon: (state) => state.user.userIcon,
    getUserSites: (state) => state.userSites,
  },

  actions: {
    async handleAuthCode(code) {
      try {
        const response = await axios.post("http://localhost:3000/auth/google", {
          code,
        });
        console.log("Response from auth endpoint", response.data);
        this.setToken(response.data.token);
        this.isAuthenticated = true;

        // Store authentication status
        localStorage.setItem("isAuthenticated", "true");

        router.push("/app");
      } catch (error) {
        console.error("Error handling token", error);
      }
    },
    setToken(token) {
      const decoded = jwtDecode(token);
      this.user = decoded;
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("auth_token", token);
      localStorage.setItem("isAuthenticated", "true");
    },
    clearToken() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
    initializeAuth() {
      const token = localStorage.getItem("auth_token");
      const isAuthenticated = localStorage.getItem("isAuthenticated");
      console.log("isAuthenticated", isAuthenticated);
      console.log("token", token);
      if (token && isAuthenticated === "true") {
        this.token = token;
        this.isAuthenticated = true;
        this.user = JSON.parse(localStorage.getItem("user"));
      } else {
        this.isAuthenticated = false;
      }
    },
    handleSignOut() {
      this.clearToken();
      router.push("/");
    },
    async setEditProfile(updatedUser) {
      try {
        await api.put("/user/profile", updatedUser);
        this.user = {...this.user, ...updatedUser};
        localStorage.setItem("user", JSON.stringify(this.user));
      } catch (error) {
        console.error("Error updating user profile", error);
      }
    },
  },
});
