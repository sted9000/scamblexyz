<template>
  <div class="h-full flex flex-col w-full">
    <div
      class="flex-1 flex flex-col bg-gray-100 rounded-lg shadow-md overflow-hidden"
    >
      <div class="p-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold text-gray-800 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
              />
            </svg>
            Recent Drops
          </h2>
          <select
            v-model="selectedSite"
            class="px-3 py-1 rounded text-base bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors duration-200 cursor-pointer appearance-none pr-8 relative text-right"
          >
            <option value="All">All</option>
            <option v-for="site in cordSites" :key="site.id" :value="site.id">
              {{ site.text }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto px-4 pb-4">
        <div
          v-if="filterdDrops.length > 0"
          class="w-full bg-white rounded-lg overflow-hidden mt-4 overflow-x-auto"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in headers"
                  :key="header"
                  class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="drop in filterdDrops" :key="drop.id">
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <img
                    :src="localSites[drop.SiteId].imagePath"
                    alt="Site Image"
                    class="h-8 w-8 mx-auto"
                  />
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"
                >
                  {{ formatDate(drop.DropDate) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"
                >
                  {{ drop.DropCount }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"
                >
                  {{ calculateLagTime(drop.DropDate, drop.SentDate) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="flex justify-center items-center h-full">
          <p class="text-gray-500 text-lg">No Recent Drops</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useCardStore } from "@/stores/card";
import { sites as localSites } from "@/constants";

const userStore = useUserStore();
const cardStore = useCardStore();
const drops = computed(() =>
  [...cardStore.getDrops].sort(
    (a, b) => new Date(b.DropDate) - new Date(a.DropDate)
  )
);
const cordSites = computed(() =>
  userStore.getCardSites.map((site) => ({ text: site.fullName, id: site.SK }))
);
const selectedSite = ref("All");
const headers = ["Site", "Date", "Count", "Lag Time"];

const filterdDrops = computed(() =>
  selectedSite.value === "All"
    ? drops.value
    : drops.value.filter((drop) => drop.SiteId === selectedSite.value)
);

const formatDate = (date) => {
  const d = new Date(date);
  const month = d.toLocaleString("default", { month: "short" });
  const day = d.getDate();
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 > 3 ? 0 : ((day % 100) - (day % 10) != 10) * (day % 10)
  ];
  return `${month} ${day}${suffix}`;
};

const calculateLagTime = (dropDate, sentDate) =>
  `${Math.floor(
    (new Date(dropDate) - new Date(sentDate)) / (7 * 24 * 60 * 60 * 1000)
  )} weeks`;
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em 1em;
}
</style>
