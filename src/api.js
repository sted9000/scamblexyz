import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import { VITE_API_URL } from "@/env";

const api = axios.create({
  baseURL: VITE_API_URL,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

// Response interceptor (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error);
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      const authStore = useAuthStore();
      authStore.clearToken();
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default api;
