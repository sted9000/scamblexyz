<template>
  <div class="daily-checkins max-w-6xl mx-auto mt-4 w-full h-full">
    <div class="pt-4 px-4 bg-gray-100 rounded-t-lg shadow-md">
      <div class="flex justify-between items-center pb-4">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
          Daily Check-ins
        </h2>

        <div class="flex items-center">
          <select
            v-model="currentFilter"
            class="px-3 py-1 rounded text-base bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors duration-200 cursor-pointer appearance-none pr-8 relative text-right mr-2"
          >
            <option value="all">All</option>
            <option value="active">Available</option>
          </select>
          <button
            @click="modalStore.setOpenModal('config')"
            class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Content Body of the Checkin -->
    <section
      class="bg-gray-100 rounded-b-lg shadow-md overflow-y-auto"
      style="height: calc(100% - 70px)"
    >
      <div
        v-if="filteredSites.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 px-4 pb-4"
      >
        <DailyItemComponent
          v-for="item in filteredSites"
          :key="item.siteId"
          :item="item"
          @itemClick="handleItemClick"
          class="bg-gray-100 rounded-md p-3 transition-transform hover:scale-105"
        />
      </div>
      <div v-else class="flex items-center justify-center h-full">
        <p class="text-gray-500 text-lg">No items available</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DailyItemComponent from "./DailyItemComponent.vue";
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const modalStore = useModalStore();
const enabledSites = computed(() => userStore.enabledSites);

const currentFilter = ref("all");

const availableSites = computed(() => {
  return enabledSites.value.filter((site) => {
    if (!site.lastVisited) {
      return true;
    }
    if (site.checkinType === "DAILY") {
      // check if last visited was today
      const wasVisitedToday =
        new Date(site.lastVisited).toDateString() === new Date().toDateString();
      if (!wasVisitedToday) {
        return true;
      }
    } else {
      if (site.lastVisited < Date.now() - site.checkinType * 60 * 60 * 1000) {
        return true;
      }
    }
  });
});

const filteredSites = computed(() => {
  if (currentFilter.value === "all") {
    return enabledSites.value;
  } else {
    return availableSites.value;
  }
});

const handleItemClick = async (item) => {
  await userStore.updateUserSite(item);
};
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em 1em;
}
</style>
