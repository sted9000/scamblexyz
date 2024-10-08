<template>
  <div class="mb-8">
    <SectionHeader title="Checkin Sites" :icon="CurrencyDollarIcon" />
    <div>
      <div
        v-if="checkins.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 pb-4"
      >
        <CheckinItem
          v-for="item in items"
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
const currentFilter = ref("All");

const handleCheckin = async (item) => {
  await checkinStore.updateCheckin(item);
};

// const handleFilterChange = (index) => {
//   currentFilter.value = index === 0 ? "Available" : "All";
// };

const items = computed(() => {
  if (currentFilter.value === "Available") {
    checkins.value.filter((site) => {
      if (site.lastVisit === null) {
        return true;
      }
      if (site.checkinType === "daily") {
        return (
          new Date(site.lastVisited).toDateString() !==
          new Date().toDateString()
        );
      }
      return site.lastVisited < Date.now() - site.checkinType * 60 * 60 * 1000;
    });
  }
  return checkins.value;
});
</script>
