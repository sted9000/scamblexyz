<template>
  <div
    class="bg-gray-50 w-full overflow-hidden mt-4 py-2 relative"
    ref="container"
  >
    <div class="max-w-6xl mx-auto px-4">
      <div v-if="isLoading" class="text-center text-gray-700">
        Loading leaderboard...
      </div>
      <div v-else class="flex overflow-hidden">
        <div
          class="ticker flex whitespace-nowrap"
          ref="ticker"
          :style="{ animationDuration: `${duration}s` }"
        >
          <div
            v-for="(player, index) in leaderboard"
            :key="`ticker1-${index}`"
            class="px-5 text-gray-700"
          >
            {{ setRank(player.rank) }} {{ player.username }} ({{
              player.score
            }})
          </div>
        </div>
        <div
          class="ticker flex whitespace-nowrap"
          ref="ticker2"
          :style="{ animationDuration: `${duration}s` }"
        >
          <div
            v-for="(player, index) in leaderboard"
            :key="`ticker2-${index}`"
            class="px-5 text-gray-700"
          >
            {{ setRank(player.rank) }}
            {{ player.username }} ({{ player.score }})
          </div>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-0 pointer-events-none bg-gradient-to-r from-gray-50 via-transparent to-gray-50"
      style="
        mask-image: linear-gradient(
          to right,
          black 5%,
          transparent 20%,
          transparent 80%,
          black 95%
        );
      "
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, computed, defineProps } from "vue";
import { useLeaderboardStore } from "../stores/leaderboard";

const props = defineProps({
  mockData: {
    type: Array,
    default: () => [],
  },
});

const leaderboardStore = useLeaderboardStore();
const leaderboard = computed(() => {
  if (props.mockData.length > 0) {
    return props.mockData;
  }
  return leaderboardStore.getLeaderboard;
});

// Modify the isLoading computed property
const isLoading = computed(() => {
  if (props.mockData.length > 0) {
    return false;
  }
  return leaderboardStore.getLoading;
});

const speed = ref(50); // pixels per second
const container = ref(null);
const ticker = ref(null);
const ticker2 = ref(null);
const duration = ref(0);

const setRank = (rank) => {
  if (rank === 999999) return "🍋";
  if (rank === 1) return "🥇";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  if (rank === 4) return "🏅";
  if (rank === 5) return "🏅";
  return `${rank}th: `;
};

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
  if (props.mockData.length === 0) {
    await leaderboardStore.fetchLeaderboard();
    leaderboardStore.pollLeaderboard();
  } else {
    // If mock data is provided, calculate duration immediately
    await calculateDuration();
  }
});

watch(
  leaderboard,
  async () => {
    if (!isLoading.value) {
      await calculateDuration();
    }
  },
  { deep: true }
);
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
