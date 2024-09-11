import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: () => import("@/components/LandingPageComponent.vue"),
  },
  {
    path: "/app",
    name: "App",
    component: () => import("@/components/ApplicationComponent.vue"),
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      const userStore = useUserStore();
      if (!userStore.backendUserDataFetched) {
        await userStore.fetchBackendUserData();
      }
      next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  await userStore.checkUser();

  if (to.path === "/" && to.query.auth === "success") {
    next({ name: "App" });
    return;
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!userStore.isAuthenticated) {
      next({ name: "LandingPage" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
