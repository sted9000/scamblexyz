<template>
  <div class="w-full overflow-hidden py-2 relative bg-white" ref="container">
    <div class="mx-auto px-4">
      <div v-if="isLoading" class="text-center text-gray-700">
        Loading leaderboard...
      </div>
      <div v-else class="flex overflow-hidden">
        <div
          class="ticker flex whitespace-nowrap"
          ref="ticker"
          :style="{ animationDuration: `${duration}s` }"
        >
          <YesterdaysWinnersScrollingSection :yesterdaysWinners="yesterdaysWinners" />
         
        </div>

        <div
          class="ticker flex whitespace-nowrap"
          ref="ticker2"
          :style="{ animationDuration: `${duration}s` }"
        >
          <YesterdaysWinnersScrollingSection :yesterdaysWinners="yesterdaysWinners" />
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-transparent to-white"
      style="
        mask-image: linear-gradient(
          to right,
          white 5%,
          transparent 20%,
          transparent 80%,
          white 95%
        );
      "
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
import YesterdaysWinnersScrollingSection from "./YesterdaysWinnersScrollingSection.vue";
import { useRealtimeStore } from "../stores/realtime";
const realtimeStore = useRealtimeStore();



const yesterdaysWinners = computed(() => {
  // If all keys have truthy values, return the leaderboard
  const winnersList = Object.values(realtimeStore.getYesterdaysLeaderboardWinners).filter(Boolean);
  if (winnersList.length > 0) {
    // List of key/value pairs
    const winnersList = Object.entries(realtimeStore.getYesterdaysLeaderboardWinners)
    return {title: "Yesterday's Winners: ", winners: winnersList}
  } else {
    return {title: "Loading...", winners: ["Loading..."]};
  }
});

// Scrolling settings
const speed = ref(7); // pixels per second
const container = ref(null);
const ticker = ref(null);
const ticker2 = ref(null);
const duration = ref(0);
const calculateDuration = async () => {
  console.log("Calculating duration");
  await nextTick();
  if (ticker.value && container.value) {
    const tickerWidth = ticker.value.offsetWidth;
    console.log("Ticker width:", tickerWidth);
    duration.value = tickerWidth / speed.value;
    console.log("New duration:", duration.value);
  } else {
    console.log("Ticker or container not available");
  }
};
onMounted(async () => {
  await calculateDuration();
});
// END Scrolling settings
</script>

<style scoped>
.ticker {
  animation: ticker-scroll linear infinite;
}

@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
