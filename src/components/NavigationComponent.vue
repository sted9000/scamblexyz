<template>
  <!-- Navigation menu -->
  <div class="md:flex md:items-center md:space-x-6">
    <template v-if="isAppRoute">
      <div class="relative">
        <div
          @click="toggleProfileMenu"
          class="flex items-center space-x-2 cursor-pointer"
        >
          <span class="text-sm font-medium text-gray-700 hidden sm:block">{{
            username
          }}</span>
          <img
            :src="icon"
            alt="Profile"
            class="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <!-- Profile Menu -->
        <div
          v-if="isProfileMenuOpen"
          class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
        >
          <a
            href="#"
            @click.prevent="handleEditProfile"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Edit Profile
          </a>
          <a
            href="#"
            @click.prevent="handleSignOut"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Logout
          </a>
        </div>
      </div>
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
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";
import { useRoute } from "vue-router";
import router from "@/router";
const userStore = useUserStore();
const modalStore = useModalStore();
const route = useRoute();
const isAppRoute = computed(() => route.path === "/app");
// const isLandingRoute = computed(() => route.path === "/");
// const isSubscriptionRoute = computed(() => route.path === '/subscribe');
const isProfileMenuOpen = ref(false);

const username = computed(() => userStore.userName);
const icon = computed(() => {
  return `/images/profile/${userStore.userIcon}.png`;
});

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const handleGoogleAuth = async () => {
  try {
    await userStore.signIn();
  } catch (error) {
    console.error("Error initiating Google sign-up:", error);
  }
};

const handleGoToApp = () => {
  router.push("/app");
};

const handleSignOut = async () => {
  try {
    await userStore.signOut();
    isProfileMenuOpen.value = false; // Close the profile menu after logout
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

const handleEditProfile = () => {
  console.log("Edit profile");
  isProfileMenuOpen.value = false; // Close the profile menu before navigating
  modalStore.setOpenModal("editProfile");
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
