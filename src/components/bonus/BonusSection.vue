<template>
  <div class="mb-8">
    <div class="flex flex-col mx-6 -mb-2">
      <h2 class="text-xl font-bold text-gray-700 mb-3">Bonuses</h2>
      <div class="flex items-center gap-2 mb-3">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedSite }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectSite('All Sites')">All Sites</a></li>
          <li><a @click="selectSite('Site 1')">Site 1</a></li>
          <li><a @click="selectSite('Site 2')">Site 2</a></li>
        </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedType }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectType('All Bonus Types')">All Types</a></li>
          <li><a @click="selectType('Deposit')">Deposit</a></li>
          <li><a @click="selectType('Happy Hour')">Happy Hour</a></li>
          <li><a @click="selectType('Signup')">Signup</a></li>
        </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedSort }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectSort('Recommended')">Recommended</a></li>
          <li><a @click="selectSort('Latest')">Latest</a></li>
          <li><a @click="selectSort('Most Claimed')">Most Claimed</a></li>
        </ul>
        </div>
      </div>
    </div>
    <div class="carousel carousel-center w-full p-4 space-x-4 rounded-box">
      <div
        v-for="bonus in filteredBonuses"
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
import { useRealtimeStore } from "@/stores/realtime"; 
const realtimeStore = useRealtimeStore();
const selectedSite = ref('All Sites');
const selectedType = ref('All Bonus Types');
const selectedSort = ref('Recommended');

const selectSite = (site) => {
  selectedSite.value = site;
};

const selectType = (type) => {
  selectedType.value = type;
};

const selectSort = (sort) => {
  selectedSort.value = sort;
};

const filteredBonuses = computed(() => {
  let b = [];

  // Filter by site
  if (selectedSite.value === 'All Sites') {
    b = realtimeStore.getCommunityBonuses;
  } else {
    b = realtimeStore.getCommunityBonuses.filter(bonus => bonus.site === selectedSite.value);
  }

  // Filter by sort
  if (selectedSort.value === 'Recommended') {
    return b.sort((a, b) => b.points - a.points);
  } else if (selectedSort.value === 'Latest') {
    return b.sort((a, b) => b.createdAt - a.createdAt);
  } else if (selectedSort.value === 'Most Claimed') {
    return b.sort((a, b) => b.claimed - a.claimed);
  }

  // Filter by type
  if (selectedType.value === 'All Bonus Types') {
    return b;
  } else {
    return b.filter(bonus => bonus.type === selectedType.value);
  }
});

</script>
