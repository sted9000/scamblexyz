<template>
  <div ref="plotContainer"></div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useCardStore } from "@/stores/card";
import * as Plot from "@observablehq/plot";
const cardStore = useCardStore();
const plotContainer = ref(null);
const cards = computed(() => {
  return cardStore.getCards;
});

const createPlot = () => {
  if (!plotContainer.value) return;

  // Clear previous plot
  plotContainer.value.innerHTML = "";
  const formattedCards = cards.value.map((card) => {
    return {
      group: card.site,
      value: card.sentAt,
      duration: (card.creditedAt - card.sentAt) / (7 * 24 * 60 * 60), // Convert seconds to weeks
    };
  });

  const plot = Plot.plot({
    marginLeft: 90,
    width: plotContainer.value.clientWidth,
    y: { grid: true, label: "Credit Time (weeks)" },
    x: { label: null },
    marks: [
      Plot.boxY(formattedCards, {
        x: "group",
        y: "duration",
        fill: "group",
        stroke: "group",
      }),
    ],
  });

  plotContainer.value.appendChild(plot);
};

onMounted(() => {
  createPlot();
});

watch(
  cards,
  () => {
    createPlot();
  },
  { deep: true }
);
</script>
