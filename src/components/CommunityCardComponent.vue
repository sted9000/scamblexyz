<template>
  <div class="h-full flex flex-col bg-gray-100 rounded-lg shadow-md p-4">
    <h2 class="text-lg font-semibold text-gray-800 flex items-center mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="purple"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      Request Card Lead Times
    </h2>
    <div class="flex-grow bg-white rounded-lg overflow-auto">
      <div ref="plotContainer" class="h-full w-full"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useCardStore } from "@/stores/card";
import * as Plot from "@observablehq/plot";
import { sites as localSites } from "@/constants";

const cardStore = useCardStore();
const plotContainer = ref(null);
const drops = computed(() => cardStore.getDrops);

const createPlot = () => {
  if (!plotContainer.value) return;
  plotContainer.value.innerHTML = "";

  const formattedDrops = drops.value.map((drop) => ({
    group: drop.SiteId,
    duration: (drop.DropDate - drop.SentDate) / (7 * 24 * 60 * 60 * 1000),
    imagePath: localSites[drop.SiteId].imagePath,
  }));

  const uniqueGroups = [...new Set(formattedDrops.map((d) => d.group))];

  const plot = Plot.plot({
    marginLeft: 60,
    marginBottom: 60,
    padding: 0.5,
    width: plotContainer.value.clientWidth,
    height: plotContainer.value.clientHeight,
    x: {
      grid: true,
      label: "Credit Time (weeks)",
      labelAnchor: "center",
      labelOffset: 40,
    },
    y: {
      domain: uniqueGroups,
      label: null,
      axis: null,
      tickSize: 0,
      tickPadding: 35,
    },
    marks: [
      Plot.boxX(formattedDrops, {
        y: "group",
        x: "duration",
        fill: "group",
        stroke: "group",
      }),
      Plot.image(formattedDrops, {
        y: "group",
        src: "imagePath",
        width: 30,
        height: 30,
        x: 0,
        dx: -30,
      }),
    ],
  });

  plotContainer.value.appendChild(plot);
};

onMounted(async () => {
  await cardStore.fetchDrops();
  createPlot();
  window.addEventListener("resize", createPlot);
});

watch(drops, createPlot, { deep: true });

onUnmounted(() => {
  window.removeEventListener("resize", createPlot);
});
</script>
