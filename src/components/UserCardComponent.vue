<template>
  <div
    class="post-cards max-w-6xl bg-gray-100 rounded-lg mx-auto mt-4 w-full min-h-[33vh] shadow-md p-4"
  >
    <div class="bg-gray-100 flex justify-between items-center">
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        Your Postcards
      </h2>
      <div class="flex space-x-2 items-center">
        <select
          v-model="currentFilter"
          class="px-3 py-1 rounded text-base bg-gray-100 text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors duration-200 cursor-pointer appearance-none pr-8 relative text-right mr-2"
        >
          <option value="all">All</option>
          <option value="outstanding">Outstanding</option>
          <option value="credited">Credited</option>
        </select>
        <button
          @click="modalStore.setOpenModal('card')"
          class="px-3 py-1 rounded border text-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-1 sm:mr-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span class="hidden sm:inline-block ml-1">Record</span>
        </button>
      </div>
    </div>

    <!-- Content Body of the Post Cards -->
    <div
      v-if="filteredCards.length === 0"
      class="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-lg m-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-12 w-12 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
      No Postcards Found
    </div>
    <div v-else class="w-full bg-white rounded-lg mt-4 overflow-hidden">
      <div class="max-h-[60vh] overflow-y-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in headers"
                :key="header.id"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header.name }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="card in filteredCards" :key="card.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center justify-center">
                  <img
                    class="h-8 w-8 rounded-full"
                    :src="card.image"
                    :alt="card.site"
                  />
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900">{{ card.SentCount }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900">
                  {{
                    new Date(card.DateSent).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    }) +
                    (new Date(card.DateSent).getDate() === 1
                      ? "st"
                      : new Date(card.DateSent).getDate() === 2
                      ? "nd"
                      : new Date(card.DateSent).getDate() === 3
                      ? "rd"
                      : "th")
                  }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900">
                  {{ card.estimated }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900">
                  {{ card.DropCount }} / {{ card.SentCount }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="card.statusClass"
                >
                  {{ card.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap font-medium text-center">
                <button
                  v-if="card.status !== 'Credited'"
                  @click="modalStore.setOpenModal('updateCard', card)"
                  :class="[card.action.class, 'text-xs px-3 py-1 rounded-full']"
                >
                  {{ card.action.text }}
                  {{ card.action.text === "DROPPED!" ? "🎉" : "" }}
                </button>
                <span v-else class="text-green-500 flex justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCardStore } from "@/stores/card";
import { useModalStore } from "@/stores/modal";
import { sites as localSites } from "@/constants";
const modalStore = useModalStore();
const cardStore = useCardStore();
const leadTimes = computed(() => cardStore.getMedianLeadTimes);
const userCards = computed(() => {
  return cardStore.getUserBatches.map((batch) => {
    const status =
      batch.DropCount === batch.SentCount
        ? "Credited"
        : batch.DropCount > 0
        ? "Partially Credited"
        : "Outstanding";
    const statusClass =
      status === "Credited"
        ? "text-green-600"
        : status === "Partially Credited"
        ? "text-orange-600"
        : "text-purple-600";
    const action =
      status === "Outstanding"
        ? {
            text: "DROPPED!",
            class:
              "text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200",
          }
        : status === "Partially Credited"
        ? {
            text: "UPDATE",
            class:
              "text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200",
          }
        : {};

    const estimated =
      leadTimes.value && leadTimes.value[batch.SiteId]
        ? new Date(
            batch.DateSent + leadTimes.value[batch.SiteId]
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : "No data";

    return {
      ...batch,
      estimated,
      status,
      statusClass,
      action,
      site: localSites[batch.SiteId]?.fullName ?? "Unknown",
      image: localSites[batch.SiteId]?.imagePath ?? null,
    };
  });
});

const filteredCards = computed(() => {
  if (currentFilter.value === "all") {
    return userCards.value;
  } else if (currentFilter.value === "outstanding") {
    return userCards.value.filter((card) => card.DropCount !== card.SentCount);
  } else {
    return userCards.value.filter((card) => card.DropCount === card.SentCount);
  }
});

const headers = [
  { id: 1, name: "Site" },
  { id: 2, name: "Count" },
  { id: 3, name: "Date Sent" },
  { id: 4, name: "Estimated Arrival" },
  { id: 5, name: "Credited" },
  { id: 6, name: "Status" },
  { id: 7, name: "Actions" },
];

const currentFilter = ref("all");

onMounted(async () => {
  await cardStore.fetchBatches();
});
</script>

<style scoped>
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em 1em;
}
</style>
