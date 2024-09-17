<template>
  <div
    class="post-cards max-w-6xl bg-gray-100 rounded-lg mx-auto mt-4 w-full min-h-[33vh] shadow-md p-4"
  >
    <div class="bg-gray-100">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="indigo"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
          Your Post Cards
        </h2>
        <div class="flex space-x-2 items-center">
          <button
            @click="filterCards('all')"
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
            @click="filterCards('outstanding')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-green-600 hover:text-white transition-colors duration-200',
              currentFilter === 'outstanding'
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-white text-green-500 border-green-300',
            ]"
          >
            Outstanding
          </button>
          <button
            @click="filterCards('credited')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-red-600 hover:text-white transition-colors duration-200',
              currentFilter === 'credited'
                ? 'bg-red-500 text-white border-red-600'
                : 'bg-white text-red-500 border-red-300',
            ]"
          >
            Credited
          </button>
          <div class="px-4 text-gray-300">|</div>
          <button
            @click="modalStore.setOpenModal('card')"
            class="px-3 py-1 rounded border text-sm bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-1"
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
            Record
          </button>
        </div>
      </div>
    </div>

    <!-- Content Body of the Post Cards -->
    <div class="w-full bg-white rounded-lg overflow-hidden mt-4">
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
                  class="h-10 w-10 rounded-full"
                  :src="card.image"
                  :alt="card.site"
                />
                <!-- <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ card.site }}
                  </div>
                </div> -->
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-900">{{ card.sent }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center">
              <div class="text-sm text-gray-900">
                {{
                  new Date(card.sentAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  }) +
                  (new Date(card.sentAt).getDate() === 1
                    ? "st"
                    : new Date(card.sentAt).getDate() === 2
                    ? "nd"
                    : new Date(card.sentAt).getDate() === 3
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
                {{ card.credited }} / {{ card.sent }}
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
                @click="modalStore.setOpenModal('updateCard', card)"
                :class="[card.action.class, 'text-xs px-3 py-1 rounded-full']"
              >
                {{ card.action.text }}
                {{ card.action.text === "DROPPED!" ? "🎉" : "" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCardStore } from "@/stores/card";
import { useModalStore } from "@/stores/modal";
const modalStore = useModalStore();
const cardStore = useCardStore();
const userCards = computed(() => {
  return cardStore.getUserCards.map((card) => {
    const status =
      card.credited === card.sent
        ? "Credited"
        : card.credited
        ? "Partially Credited"
        : "Outstanding";
    const statusClass =
      status === "Credited"
        ? "text-green-600"
        : status === "Partially Credited"
        ? "text-yellow-600"
        : "text-red-600";
    const action =
      status === "Outstanding"
        ? {
            text: "DROPPED!",
            class:
              "text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200",
          }
        : {
            text: "EDIT",
            class:
              "text-indigo-600 border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors duration-200",
          };
    return {
      id: card.id,
      site: card.site,
      image: card.image,
      sent: card.sent,
      sentAt: card.sentAt,
      estimated: card.estimated,
      credited: card.credited,
      status,
      statusClass,
      action,
    };
  });
});

const filteredCards = computed(() => {
  if (currentFilter.value === "all") {
    return userCards.value;
  } else if (currentFilter.value === "outstanding") {
    return userCards.value.filter((card) => card.credited !== card.sent);
  } else {
    return userCards.value.filter((card) => card.credited === card.sent);
  }
});

const currentFilter = ref("all");

const headers = [
  { id: 1, name: "Site" },
  { id: 2, name: "Count" },
  { id: 3, name: "Date Sent" },
  { id: 4, name: "Estimated Arrival" },
  { id: 5, name: "Credited" },
  { id: 6, name: "Status" },
  { id: 7, name: "Actions" },
];

const filterCards = (filter) => {
  currentFilter.value = filter;
};

onMounted(async () => {
  await cardStore.fetchUserCard();
});
</script>
