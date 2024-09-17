<template>
  <div
    class="max-w-6xl bg-gray-100 rounded-lg mx-auto mt-4 w-full h-full shadow-md p-4"
  >
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
      Your Streaks
    </h2>
    <div class="w-full bg-white mt-4 p-4 rounded-lg">
      <div ref="plotContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useUserStore } from "@/stores/user";
import * as Plot from "@observablehq/plot";

const userStore = useUserStore();
const plotContainer = ref(null);

const createPlot = () => {
  plotContainer.value.innerHTML = "";
  const sites = [...userStore.getSites].sort(
    (a, b) => b.longestStreak - a.longestStreak
  );
  const chart = Plot.plot({
    marginLeft: 30,
    marginBottom: 30,
    width: plotContainer.value.clientWidth,
    x: { domain: sites.map((_, i) => i), axis: null },
    y: { grid: true },
    marks: [
      Plot.barY(sites, {
        x: (_, i) => i,
        y: (d) => d.longestStreak,
        fill: "lightgray",
        title: (d) => `Longest: ${d.longestStreak}`,
      }),
      Plot.barY(sites, {
        x: (_, i) => i,
        y: (d) => d.currentStreak,
        fill: (d) => d.cssColor,
        title: (d) =>
          `Current: ${d.currentStreak}\nLongest: ${d.longestStreak}`,
      }),
      Plot.ruleY([0]),
      Plot.image(sites, {
        x: (_, i) => i,
        y: 0,
        src: (d) => d.imagePath,
        width: 20,
        height: 20,
        dy: 20,
      }),
    ],
  });
  plotContainer.value.appendChild(chart);
};

onMounted(createPlot);
watch(() => userStore.getSites, createPlot, { deep: true });
</script>

<style scoped>
:deep(.plot-bar) {
  transition: opacity 0.2s;
}
:deep(.plot-bar:hover) {
  opacity: 0.8;
}
</style>
