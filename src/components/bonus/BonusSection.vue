<template>
  <div class="mb-8">
    <div class="flex flex-col mx-6 -mb-2">
      <h2 class="text-xl font-bold text-gray-700 mb-3">Bonuses</h2>
      <div class="flex items-center gap-2 mb-3">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedSort }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectSort('Recommended')">Recommended</a></li>
          <li><a @click="selectSort('Latest')">Latest</a></li>
          <li><a @click="selectSort('Most Claimed')">Most Claimed</a></li>
          <li><a @click="selectSort('Highest Value')">Highest Value</a></li>
        </ul>
        </div>
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
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedClaim }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectClaim('All Bonus Claim Types')">All Types</a></li>
          <li><a @click="selectClaim('Single')">Single</a></li>
          <li><a @click="selectClaim('Multi')">Multi</a></li>
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
import { recommendedBonusScore } from "@/utils";
const realtimeStore = useRealtimeStore();
const selectedSite = ref('All Sites');
const selectedType = ref('All Bonus Types');
const selectedSort = ref('Recommended');
const selectedClaim = ref('All Bonus Claim Types');

const selectSite = (site) => {
  selectedSite.value = site;
};

const selectType = (type) => {
  selectedType.value = type;
};

const selectSort = (sort) => {
  selectedSort.value = sort;
};

const selectClaim = (claim) => {
  selectedClaim.value = claim;
};

const filteredBonuses = computed(() => {
  // copy the array
  let filteredBonuses = [...realtimeStore.getCommunityBonuses];

  /*** First filter the bonuses */
  // By site
  if (selectedSite.value !== 'All Sites') {
    filteredBonuses = filteredBonuses.filter(bonus => bonus.site === selectedSite.value);
  }
  // By type
  if (selectedType.value !== 'All Bonus Types') {
    filteredBonuses = filteredBonuses.filter(bonus => bonus.type === selectedType.value);
  }
  // By claim type
  if (selectedClaim.value !== 'All Bonus Claim Types') {
    filteredBonuses = filteredBonuses.filter(bonus => bonus.claimLimit === selectedClaim.value);
  }

  /*** Then sort the bonuses */
  if (selectedSort.value === 'Recommended') {
    filteredBonuses = filteredBonuses.sort((a, b) => recommendedBonusScore(b) - recommendedBonusScore(a));
  } else if (selectedSort.value === 'Latest') {
    filteredBonuses = filteredBonuses.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
  } else if (selectedSort.value === 'Most Claimed') {
    filteredBonuses = filteredBonuses.sort((a, b) => b.claimedCount - a.claimedCount);
  } else if (selectedSort.value === 'Highest Value') {
    filteredBonuses = filteredBonuses.sort((a, b) => (b.bonusAmount - b.amount) - (a.bonusAmount - a.amount));
  }

  return filteredBonuses;
});

</script>
