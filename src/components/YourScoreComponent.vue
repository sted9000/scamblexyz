<template>
  <div class="flex flex-col items-center justify-center mt-4">
    <div class="text-3xl font-bold text-gray-600 flex items-center">
      {{ userRank }}
      <!-- <span
        v-if="spotChange > 0"
        class="text-green-600 text-opacity-60 text-sm fade-in ml-2"
      >
        ↑{{ spotChange }}
      </span>
      <span
        v-else-if="spotChange < 0"
        class="text-red-600 text-opacity-60 text-sm fade-in ml-2"
      >
        ↓{{ Math.abs(spotChange) }}
      </span> -->
    </div>
    <div class="text-lg text-gray-600 flex items-center space-x-4 fade-in">
      <span>{{ userScore }} Points</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

// getters for the userScore, userRank, and userIcon from the userStore
const userScore = computed(() => userStore.userScore);
const userRank = computed(() => {
  if (userStore.userRank === 999999) {
    return "Last Place 🥲";
  } else if (userStore.userRank === 1) {
    return "1st Place 🏆";
  } else if (userStore.userRank === 2) {
    return "2nd Plane 🥈";
  } else if (userStore.userRank === 3) {
    return "3rd Place 🥉";
  } else {
    return `${userStore.userRank}th Place 🎉`;
  }
});
</script>
