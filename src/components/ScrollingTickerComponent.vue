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
          <div
            v-for="(item, index) in leaderboard"
            :key="`ticker1-${index}`"
            :class="[
              'text-gray-700',
              'font-bold',
              (index + 1) % 4 === 0 ? 'pr-12' : 'pr-4',
            ]"
          >
            {{ item }}
          </div>
        </div>
        <div
          class="ticker flex whitespace-nowrap"
          ref="ticker2"
          :style="{ animationDuration: `${duration}s` }"
        >
          <div
            v-for="(item, index) in leaderboard"
            :key="`ticker1-${index}`"
            :class="[
              'text-gray-700',
              'font-bold',
              (index + 1) % 4 === 0 ? 'pr-12' : 'pr-4',
            ]"
          >
            {{ item }}
          </div>
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
import { useLeaderboardStore } from "../stores/leaderboard";

const leaderboardStore = useLeaderboardStore();
const bannerPlayers = computed(() => {
  return leaderboardStore.bannerPlayers;
});
const leaderboardString = (title, items) => {
  let result = [title];
  items.forEach((item, index) => {
    let str = "";
    if (index === 0) {
      str += "🥇 ";
    } else if (index === 1) {
      str += "🥈 ";
    } else if (index === 2) {
      str += "🥉 ";
    } else {
      str += "🏅 ";
    }
    str += `${item.username} (${item.score})`;
    result.push(str);
  });
  return result;
};
const leaderboard = computed(() => {
  if (!bannerPlayers.value) return ["Loading..."];
  let formattedLeaderboard = [];
  formattedLeaderboard.push(
    ...leaderboardString("All Time Leaders: ", bannerPlayers.value["ALL_TIME"])
  );
  formattedLeaderboard.push(
    ...leaderboardString("Weekly Leaders: ", bannerPlayers.value["WEEKLY"])
  );
  formattedLeaderboard.push(
    ...leaderboardString(
      "Yesterday's Leaders: ",
      bannerPlayers.value["DAILY_YESTERDAY"]
    )
  );
  formattedLeaderboard.push(
    ...leaderboardString(
      "Today's Leaders: ",
      bannerPlayers.value["DAILY_TODAY"]
    )
  );
  return formattedLeaderboard;
});

const speed = ref(20); // pixels per second
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
