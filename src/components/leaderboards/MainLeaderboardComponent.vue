<script setup>
import { ref, onMounted } from "vue";
import * as Plot from "@observablehq/plot";
import { TrophyIcon } from "@heroicons/vue/24/outline";

const leaderboardData = ref([
  { name: "Player1", day: 1, score: 100 },
  { name: "Player1", day: 2, score: 135 },
  { name: "Player1", day: 3, score: 180 },
  { name: "Player1", day: 4, score: 210 },
  { name: "Player1", day: 5, score: 280 },
  { name: "Player2", day: 1, score: 120 },
  { name: "Player2", day: 2, score: 160 },
  { name: "Player2", day: 3, score: 140 },
  { name: "Player2", day: 4, score: 230 },
  { name: "Player2", day: 5, score: 290 },
  { name: "Player3", day: 1, score: 90 },
  { name: "Player3", day: 2, score: 170 },
  { name: "Player3", day: 3, score: 220 },
  { name: "Player3", day: 4, score: 200 },
  { name: "Player3", day: 5, score: 270 },
  { name: "Player4", day: 1, score: 110 },
  { name: "Player4", day: 2, score: 130 },
  { name: "Player4", day: 3, score: 190 },
  { name: "Player4", day: 4, score: 260 },
  { name: "Player4", day: 5, score: 240 },
  { name: "Player5", day: 1, score: 130 },
  { name: "Player5", day: 2, score: 180 },
  { name: "Player5", day: 3, score: 150 },
  { name: "Player5", day: 4, score: 340 },
  { name: "Player5", day: 5, score: 510 },
]);

const plotContainer = ref(null);
const timeFrame = ref("Top 5");

onMounted(() => {
  const plot = Plot.plot({
    width: plotContainer.value.offsetWidth,
    height: 300,
    marginRight: 20,
    y: { label: "Score" },
    x: { label: "Day", axis: null },
    marks: [
      Plot.line(leaderboardData.value, {
        x: "day",
        y: "score",
        stroke: "name",
        strokeWidth: 2,
        curve: "natural",
      }),
      Plot.dot(leaderboardData.value, {
        x: "day",
        y: "score",
        stroke: "name",
        fill: "name",
      }),
    ],
  });

  plotContainer.value.appendChild(plot);
});
</script>

<template>
  <div class="mt-4 mb-8">
    <div class="flex justify-between items-center mb-4">
      <div class="w-1/4"></div>
      <!-- Spacer -->
      <h2
        class="text-lg font-semibold text-gray-700 flex-grow text-center flex items-center justify-center"
      >
        <TrophyIcon class="w-5 h-5 mr-3" />
        Leaderboards
      </h2>
      <div class="relative inline-block w-1/4">
        <!-- Changed width to w-24 -->
        <select
          v-model="timeFrame"
          class="w-full text-gray-500 bg-transparent hover:bg-gray-50 cursor-pointer py-1 pr-8 pl-1 rounded appearance-none focus:outline-none text-right"
        >
          <option>Top 5</option>
          <option>Top 10</option>
          <option>Top 15</option>
        </select>
        <div
          class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
        >
          <svg
            class="fill-current h-4 w-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div ref="plotContainer" class="p-4 bg-indigo-50 rounded-3xl"></div>
  </div>
</template>
