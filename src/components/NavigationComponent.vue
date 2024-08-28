<template>
  <div class="relative">
    <!-- Hamburger button for small screens -->
    <button
      @click="toggleMenu"
      class="md:hidden text-gray-500 hover:text-gray-600"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>

    <!-- Navigation menu -->
    <div
      :class="{ hidden: !isMenuOpen, block: isMenuOpen }"
      class="md:flex md:items-center md:space-x-6 absolute right-0 top-10 bg-white p-4 rounded-lg shadow-md md:shadow-none md:p-0 md:bg-transparent md:static"
    >
      <template v-if="isAppRoute">
        <button
          @click="handleSignOut"
          class="w-full text-left px-4 py-2 text-sm font-medium rounded-md text-white animated-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign out
        </button>
      </template>
      <template v-else-if="userStore.user && !isLandingRoute">
        <button
          @click="handleSignOut"
          class="w-full text-left px-4 py-2 text-sm font-medium rounded-md text-white animated-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign out
        </button>
      </template>
      <template v-else-if="userStore.user">
        <button
          @click="handleGoToApp"
          class="w-full text-left px-4 py-2 text-sm font-medium rounded-md text-white animated-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to app
        </button>
      </template>
      <template v-else>
        <button
          @click="handleGoogleAuth"
          class="w-full text-left px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-900"
        >
          Login
        </button>
        <button
          @click="handleGoogleAuth"
          class="w-full text-left mt-2 md:mt-0 px-4 py-2 text-sm font-medium rounded-md text-white animated-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
        >
          Sign up
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import router from "@/router";
const userStore = useUserStore();
const route = useRoute();
const isAppRoute = computed(() => route.path === "/app");
const isLandingRoute = computed(() => route.path === "/");
// const isSubscriptionRoute = computed(() => route.path === '/subscribe');
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleGoogleAuth = async () => {
  try {
    await userStore.signIn();
  } catch (error) {
    console.error("Error initiating Google sign-up:", error);
  }
};

const handleSignOut = async () => {
  try {
    await userStore.signOut();
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

const handleGoToApp = () => {
  router.push("/app");
};
</script>

<style scoped>
@media (max-width: 768px) {
  .animated-button {
    width: 100%;
    text-align: left;
  }
}

/* Optional: Add transition for smooth menu opening/closing */
.md\:flex {
  transition: all 0.3s ease-in-out;
}
</style>
