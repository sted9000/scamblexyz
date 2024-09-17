<template>
  <div
    class="post-cards max-w-6xl bg-gray-100 rounded-lg mx-auto mt-4 w-full h-full shadow-md p-4"
  >
    <div class="bg-gray-100">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-800 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="purple"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          Community Post Cards
        </h2>
        <div class="flex space-x-2 items-center">
          <button
            @click="filterCards('leadTime')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-blue-600 hover:text-white transition-colors duration-200',
              currentFilter === 'leadTime'
                ? 'bg-blue-500 text-white border-blue-600'
                : 'bg-white text-blue-500 border-blue-300',
            ]"
          >
            Lead Times
          </button>
          <button
            @click="filterCards('drops')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-green-600 hover:text-white transition-colors duration-200',
              currentFilter === 'drops'
                ? 'bg-green-500 text-white border-green-600'
                : 'bg-white text-green-500 border-green-300',
            ]"
          >
            Drops
          </button>
          <button
            @click="filterCards('outstanding')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-red-600 hover:text-white transition-colors duration-200',
              currentFilter === 'outstanding'
                ? 'bg-red-500 text-white border-red-600'
                : 'bg-white text-red-500 border-red-300',
            ]"
          >
            Outstanding
          </button>
          <button
            @click="filterCards('money')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-yellow-600 hover:text-white transition-colors duration-200',
              currentFilter === 'money'
                ? 'bg-yellow-500 text-white border-yellow-600'
                : 'bg-white text-yellow-500 border-yellow-300',
            ]"
          >
            $
          </button>
          <button
            @click="filterCards('formatting')"
            :class="[
              'px-3 py-1 rounded border text-sm hover:bg-purple-600 hover:text-white transition-colors duration-200',
              currentFilter === 'formatting'
                ? 'bg-purple-500 text-white border-purple-600'
                : 'bg-white text-purple-500 border-purple-300',
            ]"
          >
            Formatting
          </button>
        </div>
      </div>
    </div>

    <!-- Content Body of the Post Cards -->
    <!-- CardComponent will be placed here -->
    <div class="w-full bg-white mt-4 p-4 rounded-lg">
      <LeadTimeComponent v-if="currentFilter === 'leadTime'" />
      <DropsComponent v-else-if="currentFilter === 'drops'" />
      <OutstandingComponent v-else-if="currentFilter === 'outstanding'" />
      <MoneyComponent v-else-if="currentFilter === 'money'" />
      <FormattingComponent v-else-if="currentFilter === 'formatting'" />
      <div ref="plotContainer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import LeadTimeComponent from "@/components/card/LeadTimeComponent.vue";
import DropsComponent from "@/components/card/DropsComponent.vue";
import OutstandingComponent from "@/components/card/OutstandingComponent.vue";
import MoneyComponent from "@/components/card/MoneyComponent.vue";
import FormattingComponent from "@/components/card/FormattingComponent.vue";
import { useCardStore } from "@/stores/card";
const cardStore = useCardStore();
const currentFilter = ref("leadTime");

const filterCards = (filter) => {
  currentFilter.value = filter;
};

onMounted(async () => {
  await cardStore.fetchCard();
});
</script>
