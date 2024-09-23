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
          class="h-8 w-8 mr-2 text-purple-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        About / FAQ
      </h2>
      <h3 class="text-lg text-gray-600 mb-4">Under development.</h3>
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
