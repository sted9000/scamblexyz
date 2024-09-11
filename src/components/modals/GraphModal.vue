<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-sm w-full max-h-[75vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 mr-2 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3v18h18M3 15l6-6 4 4 8-8"
          />
        </svg>
        Profits
      </h2>
      <h3 class="text-lg text-gray-600 mb-4">
        Watch your earnings accumulate over time. Under development.
      </h3>
      <div>
        <button
          class="mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg"
          @click="closeModal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
