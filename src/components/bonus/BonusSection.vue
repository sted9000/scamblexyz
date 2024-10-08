<template>
  <div class="mb-8">
    <div class="flex justify-between items-center mx-6 -mb-2">
      <h2 class="text-xl font-bold text-gray-700">Bonuses</h2>
      <div class="flex space-x-2">
        <select class="select select-bordered">
          <option selected>All Types</option>
          <option>Deposit</option>
          <option>Happy Hour</option>
          <option>Signup</option>
          <option>Signup</option>
        </select>
        <select class="select select-bordered">
          <option selected>Recommended</option>
          <option>Latest</option>
        </select>
      </div>
    </div>
    <div class="carousel carousel-center w-full p-4 space-x-4 rounded-box">
      <div
        v-for="bonus in communityBonuses"
        :key="bonus.id"
        class="carousel-item"
      >
        <BonusItem
          :item="bonus"
          class="bg-gray-100 rounded-md p-6 transition-transform hover:scale-105 hover:bg-gray-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import BonusItem from "@/components/bonus/BonusItem.vue";

import { useBonusStore } from "@/stores/bonus";
const bonusStore = useBonusStore();
const filterIndex = ref(0);
const communityBonuses = computed(() => {
  if (filterIndex.value === 0) {
    return bonusStore.getCommunityBonus;
  } else {
    return bonusStore.getCommunityBonus;
  }
});

</script>
