<template>
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
          <h2 class="text-2xl font-bold">Edit Batch</h2>
          <div class="text-md text-gray-700 mt-1">Batch Id: {{ batch.id }}</div>
        
          <form @submit.prevent="submitPost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Site</label
          >
          <div class="flex flex-wrap -mx-1">
            <label
              v-for="site in sites"
              :key="site.id"
              :class="[
                'flex items-center px-3 py-1 rounded border text-sm cursor-pointer transition-colors duration-200 m-1',
                selectedSite === site.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100',
              ]"
            >
              <input
                type="radio"
                :value="site.id"
                v-model="selectedSite"
                class="hidden"
                required
              />
              <img
                :src="site.imagePath"
                :alt="site.fullName"
                class="w-3 h-3 mr-2"
              />
              {{ site.fullName }}
            </label>
          </div>
        </div>
        <div>
          <label for="cardCount" class="block text-sm font-medium text-gray-700"
            >How many cards</label
          >
          <input
            type="number"
            id="cardCount"
            v-model="cardCount"
            required
            min="1"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
        </div>

        <div>
          <label for="dateSent" class="block text-sm font-medium text-gray-700"
            >Date Sent</label
          >
          <input
            type="date"
            id="dateSent"
            v-model="dateSent"
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
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update  
          </button>
        </div>
      </form>
   
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from "vue";
  import { useModalStore } from "@/stores/modal";
  import { usePostcardStore } from "@/stores/postcard";
  import { useUserStore } from "@/stores/user";
  
  const modalStore = useModalStore();
  const postcardStore = usePostcardStore();
  const userStore = useUserStore();
  const batch = computed(() => postcardStore.getBatch);
  const selectedSite = ref(batch.value.siteId);
  const cardCount = ref(batch.value.totalCards);
  const dateSent = ref(new Date(batch.value.submissionDate).toISOString().split("T")[0]);
  const allowAnonymizedData = ref(batch.value.allowShare);
  const sites = computed(() => {
    return userStore.getPostcardSites;
  });
  
  const submitPost = () => {
    postcardStore.updateBatch(batch.value.id, {
      siteId: selectedSite.value,
      totalCards: cardCount.value,
      submissionDate: dateSent.value,
      allowShare: allowAnonymizedData.value,
    });
    closeModal();
  };
  
  
  const closeModal = () => {
    modalStore.setCloseAllModals();
  };
  </script>
  