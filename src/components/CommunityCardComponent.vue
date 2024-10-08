<template>
  <div class="flex-grow bg-gray-50 rounded-lg overflow-auto m-4 p-4">
    <div ref="plotContainer" class="h-full w-full"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
// import { useCardStore } from "@/stores/card";
import * as Plot from "@observablehq/plot";
import { sites as localSites } from "@/constants";
// const cardStore = useCardStore();
const plotContainer = ref(null);
// const drops = computed(() => cardStore.getDrops);

const drops = [
  {
    SiteId: "SITE#0",
    DropDate: Date.now() - 1000000000,
    SentDate: Date.now() - 1200000000,
  },
  {
    SiteId: "SITE#0",
    DropDate: Date.now() - 2000000000,
    SentDate: Date.now() - 2300000000,
  },
  {
    SiteId: "SITE#0",
    DropDate: Date.now() - 3000000000,
    SentDate: Date.now() - 3400000000,
  },
  {
    SiteId: "SITE#15",
    DropDate: Date.now() - 4000000000,
    SentDate: Date.now() - 4500000000,
  },
  {
    SiteId: "SITE#15",
    DropDate: Date.now() - 5000000000,
    SentDate: Date.now() - 5600000000,
  },
  {
    SiteId: "SITE#15",
    DropDate: Date.now() - 6000000000,
    SentDate: Date.now() - 6700000000,
  },
  {
    SiteId: "SITE#1",
    DropDate: Date.now() - 7000000000,
    SentDate: Date.now() - 7800000000,
  },
  {
    SiteId: "SITE#1",
    DropDate: Date.now() - 8000000000,
    SentDate: Date.now() - 8900000000,
  },
  {
    SiteId: "SITE#1",
    DropDate: Date.now() - 9000000000,
    SentDate: Date.now() - 10000000000,
  },
  {
    SiteId: "SITE#4",
    DropDate: Date.now() - 10000000000,
    SentDate: Date.now() - 11100000000,
  },
  {
    SiteId: "SITE#4",
    DropDate: Date.now() - 11000000000,
    SentDate: Date.now() - 12200000000,
  },
  {
    SiteId: "SITE#4",
    DropDate: Date.now() - 12000000000,
    SentDate: Date.now() - 13300000000,
  },
  {
    SiteId: "SITE#11",
    DropDate: Date.now() - 13000000000,
    SentDate: Date.now() - 14400000000,
  },
  {
    SiteId: "SITE#11",
    DropDate: Date.now() - 14000000000,
    SentDate: Date.now() - 15500000000,
  },
  {
    SiteId: "SITE#11",
    DropDate: Date.now() - 15000000000,
    SentDate: Date.now() - 16600000000,
  },
  {
    SiteId: "SITE#16",
    DropDate: Date.now() - 16000000000,
    SentDate: Date.now() - 17700000000,
  },
  {
    SiteId: "SITE#16",
    DropDate: Date.now() - 17000000000,
    SentDate: Date.now() - 18800000000,
  },
  {
    SiteId: "SITE#16",
    DropDate: Date.now() - 18000000000,
    SentDate: Date.now() - 19900000000,
  },
];

const createPlot = () => {
  if (!plotContainer.value) return;
  plotContainer.value.innerHTML = "";

  const formattedDrops = drops.map((drop) => ({
    group: drop.SiteId,
    duration: (drop.DropDate - drop.SentDate) / (7 * 24 * 60 * 60 * 1000),
    imagePath: localSites[drop.SiteId].imagePath,
  }));

  const uniqueGroups = [...new Set(formattedDrops.map((d) => d.group))];

  console.log(uniqueGroups);
  console.log(formattedDrops);
  const plot = Plot.plot({
    marginLeft: 60,
    marginBottom: 60,
    padding: 0.5,
    height: 400,
    width: plotContainer.value.clientWidth,
    // height: plotContainer.value.clientHeight,
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
        width: 24,
        height: 24,
        x: 0,
        dx: -30,
      }),
    ],
  });

  plotContainer.value.appendChild(plot);
};

onMounted(async () => {
  // await cardStore.fetchDrops();
  createPlot();
  window.addEventListener("resize", createPlot);
});

watch(drops, createPlot, { deep: true });

onUnmounted(() => {
  window.removeEventListener("resize", createPlot);
});
</script>
