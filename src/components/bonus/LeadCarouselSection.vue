<template>
  <div>
    <div class="flex items-center justify-between">
      <SectionHeader title="Top Bonuses" :icon="UserGroupIcon" />
      <button @click="uiStore.setView('Bonuses')" class="btn btn-link text-sm text-gray-500 px-6">See All Bonuses</button>
    </div>
    
    <div
      class="carousel carousel-center w-full px-4 py-2 space-x-4 rounded-box -mt-2"
    >
      <div v-for="bonus in filteredBonuses" :key="bonus.id" class="carousel-item">
        <BonusItem
          :item="bonus"
          class="rounded-md p-3 transition-transform hover:scale-105 hover:bg-gray-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import BonusItem from "@/components/bonus/BonusItem.vue";
import { UserGroupIcon } from "@heroicons/vue/24/outline";
import { useRealtimeStore } from "@/stores/realtime";
import { useUiStore } from "@/stores/ui";
import { recommendedBonusScore } from "@/utils";
const realtimeStore = useRealtimeStore();
const uiStore = useUiStore();
const filteredBonuses = computed(() => {
  // Create a new array with spread operator before sorting
  const rankedBonuses = [...realtimeStore.getCommunityBonuses].sort((a, b) => 
    recommendedBonusScore(b) - recommendedBonusScore(a)
  );
  // return the top 5
  return rankedBonuses.slice(0, 5);
});
</script>
