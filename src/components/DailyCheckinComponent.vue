<template>
  <div class="daily-checkins max-w-6xl mx-auto mt-4 w-full h-full">
    <div class="pt-4 px-4 bg-gray-100 rounded-t-lg shadow-md">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800">Daily Check-ins</h2>
        <div class="flex space-x-2 items-center">
          <button
            @click="filterSites('all')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-blue-600 hover:text-white transition-colors duration-200',
              currentFilter === 'all'
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-blue-500 border-blue-300',
            ]"
          >
            All
          </button>
          <button
            @click="filterSites('active')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-green-600 hover:text-white transition-colors duration-200',
              currentFilter === 'active'
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-white text-green-500 border-green-300',
            ]"
          >
            Available
          </button>
          <button
            class="p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center"
            @click="handleOpenConfig"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 px-4 py-4"
      >
        <DailyItemComponent
          v-for="item in filteredSites"
          :key="item.siteId"
          :item="item"
          @itemClick="handleItemClick"
          class="bg-gray-100 rounded-md p-3 transition-transform hover:scale-105"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DailyItemComponent from "./DailyItemComponent.vue";
import { useUserStore } from "@/stores/user";
import { useModalStore } from "@/stores/modal";
const userStore = useUserStore();
const modalStore = useModalStore();
const enabledSites = computed(() => userStore.enabledSites);

const currentFilter = ref("all");

const filterSites = (filter) => {
  currentFilter.value = filter;
};

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

const handleOpenConfig = () => {
  console.log("open config");
  modalStore.setOpenModal("config");
};
</script>
