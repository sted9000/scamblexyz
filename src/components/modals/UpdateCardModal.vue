<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Record Your Drop</h2>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Site</label>
        <div class="flex items-center text-lg font-semibold text-gray-400">
          <img
            :src="modalData.image"
            :alt="modalData.site"
            class="w-5 h-5 mr-2 opacity-50"
          />
          {{ modalData.site }}
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Previously Credited</label
        >
        <div class="text-lg font-semibold text-gray-400">
          {{ modalData.credited }} / {{ modalData.sent }}
        </div>
      </div>
      <form @submit.prevent="submitPost" class="space-y-4">
        <div>
          <div class="flex flex-wrap -mx-1">
            <label
              v-for="site in cardSites"
              :key="site.value"
              :class="[
                'flex items-center px-3 py-1 rounded border text-sm cursor-pointer transition-colors duration-200 m-1',
                cardSite === site.value
                  ? `${site.activeClass}`
                  : `${site.inactiveClass}`,
              ]"
            >
              <input
                type="radio"
                :value="site.value"
                v-model="cardSite"
                class="hidden"
              />
              <img :src="site.image" :alt="site.label" class="w-3 h-3 mr-2" />
              {{ site.label }}
            </label>
          </div>
        </div>
        <div>
          <label for="cardCount" class="block text-sm font-medium text-gray-700"
            >How many new cards dropped?</label
          >
          <input
            type="number"
            id="cardCount"
            v-model="cardCount"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
        </div>

        <div>
          <label for="dateSent" class="block text-sm font-medium text-gray-700"
            >Date Credited</label
          >
          <input
            type="date"
            id="dateCredited"
            v-model="dateCredited"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
        </div>
        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            id="allowAnonymizedData"
            v-model="allowAnonymizedData"
            class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <label for="allowAnonymizedData" class="text-sm text-gray-700">
            Allow anonymized data
          </label>
          <a href="#" class="text-sm text-blue-600 hover:underline"
            >Learn more</a
          >
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModalStore } from "@/stores/modal";
import { useBoardStore } from "@/stores/board";
const modalStore = useModalStore();
const boardStore = useBoardStore();
const cardCount = ref(0);
const dateCredited = ref(new Date().toISOString().substr(0, 10));
const modalData = computed(() => modalStore.getModalData);
const allowAnonymizedData = ref(true);

const closeModal = () => {
  modalStore.setCloseAllModals();
};

const submitPost = () => {
  const newPost = {
    card: modalData,
    cardsDropped: cardCount.value,
    dateCredited: dateCredited.value,
    allowAnonymizedData: allowAnonymizedData.value,
  };

  boardStore.addPost(newPost);
  closeModal();
};
</script>
