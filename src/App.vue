<template>
  <div class="flex flex-col min-h-screen bg-white">
    <HeaderComponent />
    <main class="flex-grow flex items-center justify-center">
      <div
        v-if="isLoading"
        class="w-full h-full flex items-center justify-center"
      >
        <div
          class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"
        ></div>
      </div>
      <div v-else class="w-full">
        <router-view></router-view>
      </div>
    </main>
  </div>
  <!-- <div>testing</div> -->
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const isLoading = computed(
  () => userStore.getIsLoading || userStore.getIsLoggingOut
);
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();

onMounted(() => {
  authStore.initializeGoogleSignIn();
});
</script>
