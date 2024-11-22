import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
const API_URL = process.env.VUE_APP_API_URL

const api = axios.create({
  baseURL: API_URL,
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
