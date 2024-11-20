<template>
  <div class="mb-8">
    <SectionHeader title="Checkin Sites" :icon="CurrencyDollarIcon" />
    <div>
      <!-- Filter -->
      <div class="flex items-center gap-2 mb-3 ml-6 -mt-2">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedSort }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectSort('Longest Streak')">Longest Streak</a></li>
          <li><a @click="selectSort('Highest Value')">Highest Value</a></li>
        </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedAvailability }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectAvailability('All Availability')">All Availability</a></li>
          <li><a @click="selectAvailability('Available')">Available</a></li>
          <li><a @click="selectAvailability('Unavailable')">Unavailable</a></li>
        </ul>
        </div>

      </div>
      <div
        v-if="checkins.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 pb-4"
      >
        <CheckinItem
          v-for="item in filteredCheckins"
          :key="item.SiteId"
          :item="item"
          @itemClick="handleCheckin"
          class="bg-gray-100 rounded-md p-3 transition-transform hover:scale-105"
        />
      </div>
      <div v-else class="flex items-center justify-center h-full">
        <p class="text-gray-500 text-lg">No items available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CheckinItem from "@/components/checkin/CheckinItem.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { CurrencyDollarIcon } from "@heroicons/vue/24/outline";
import { useCheckinStore } from "@/stores/checkin";

const checkinStore = useCheckinStore();
const checkins = computed(() => checkinStore.getEnabledCheckin);
const selectedSort = ref("Longest Streak");
const selectedAvailability = ref("All Availability");
const handleCheckin = async (item) => {
  await checkinStore.updateCheckin(item);
};

const selectSort = (sort) => {
  selectedSort.value = sort;
};

const selectAvailability = (availability) => {
  selectedAvailability.value = availability;
};

const filteredCheckins = computed(() => {
  // Local copy of the checkins
  let localCheckins = [...checkins.value];

  // First apply the filter
  if (selectedAvailability.value === "Available") {
    localCheckins = localCheckins.filter((site) => site.availability.isAvailable);
  } else if (selectedAvailability.value === "Unavailable") {
    localCheckins = localCheckins.filter((site) => !site.availability.isAvailable);
  }

  // Then apply the sort
  if (selectedSort.value === "Longest Streak") {
    localCheckins.sort((a, b) => b.streak - a.streak);
  } else if (selectedSort.value === "Highest Value") {
    localCheckins.sort((a, b) => b.Site.checkinValue - a.Site.checkinValue);
  }

  return localCheckins;
});
</script>
