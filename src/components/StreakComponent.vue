<template>
  <div class="bg-gray-100 rounded-lg mx-auto mt-4 w-full shadow-md p-4">
    <div class="flex items-center justify-between flex-wrap gap-2">
      <h2 class="text-lg font-semibold text-gray-800 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="orange"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Streaks
      </h2>
      <select
        v-model="viewMode"
        class="px-3 py-1 rounded text-base bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors duration-200 cursor-pointer appearance-none pr-8 relative text-right"
      >
        <option value="longest">vs Longest Streak</option>
        <option value="community" disabled>vs Community Leader</option>
      </select>
    </div>
    <div class="w-full bg-white mt-4 p-4 rounded-lg overflow-x-auto relative">
      <div
        ref="plotContainer"
        class="min-w-[1000px]"
        :class="{ 'opacity-30': noStreaks }"
      ></div>
      <div
        v-if="noStreaks"
        class="absolute inset-0 flex items-center justify-center"
      >
        <p class="text-xl font-semibold text-gray-600">No streaks to show</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from "vue";
import { useUserStore } from "@/stores/user";
import * as Plot from "@observablehq/plot";

const userStore = useUserStore();
const plotContainer = ref(null);
const viewMode = ref("longest");

const enabledSites = computed(() => userStore.enabledSites);
const noStreaks = computed(
  () => !enabledSites.value.some((site) => site.currentStreak > 0)
);

const sitesData = computed(() => {
  return enabledSites.value.map((site) => ({
    imagePath: site.imagePath,
    currentStreak: noStreaks.value
      ? Math.floor(Math.random() * 100)
      : site.currentStreak,
    longestStreak: noStreaks.value
      ? Math.floor(Math.random() * 100)
      : site.longestStreak,
    cssColor: site.cssColor,
    tailwindColor: site.tailwindColor,
  }));
});

onMounted(() => {
  watchEffect(() => {
    if (plotContainer.value) {
      const sortedSites = sitesData.value.sort(
        (a, b) => b.longestStreak - a.longestStreak
      );
      const chart = Plot.plot({
        marginLeft: 30,
        marginBottom: 30,
        width: Math.max(600, plotContainer.value.clientWidth),
        x: { domain: sortedSites.map((_, i) => i), axis: null },
        y: { grid: true, label: "Days" },
        marks: [
          Plot.barY(sortedSites, {
            x: (_, i) => i,
            y: (d) => Math.max(d.longestStreak, 0),
            fill: "lightgray",
            title: (d) => `Longest: ${d.longestStreak}`,
          }),
          Plot.barY(sortedSites, {
            x: (_, i) => i,
            y: (d) => Math.max(d.currentStreak, 0),
            fill: (d) => d.cssColor,
            title: (d) =>
              `Current: ${d.currentStreak}\nLongest: ${d.longestStreak}`,
          }),
          Plot.ruleY([0]),
          Plot.image(sortedSites, {
            x: (_, i) => i,
            y: 0,
            src: (d) => d.imagePath,
            width: 20,
            height: 20,
            dy: 20,
          }),
        ],
      });
      plotContainer.value.innerHTML = "";
      plotContainer.value.appendChild(chart);
    }
  });
});
</script>

<style scoped>
:deep(.plot-bar) {
  transition: opacity 0.2s;
}
:deep(.plot-bar:hover) {
  opacity: 0.8;
}
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em 1em;
}
</style>
