import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: () => import("@/components/landingPage/LandingPageComponent.vue"),
  },
  {
    path: "/auth/google",
    name: "GoogleAuth",
    component: () => import("@/components/views/GoogleAuthHandler.vue"),
  },
  {
    path: "/app",
    name: "App",
    component: () => import("@/components/ApplicationComponent.vue"),
    meta: { requiresAuth: true },
  },
];

// function checkAuthStatus() {
//   const token = localStorage.getItem("auth_token");
//   return !!token; // Returns true if token exists, false otherwise
// }

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Initialize the auth status from localStorage
  authStore.initializeAuth();

  if (to.path === "/" && authStore.isAuthenticated) {
    next("/app");
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !authStore.isAuthenticated
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
