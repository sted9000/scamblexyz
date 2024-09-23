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
        <div class="flex items-center text-lg font-semibold text-gray-700">
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
        <div class="text-lg font-semibold text-gray-700">
          {{ modalData.DropCount }} / {{ modalData.SentCount }}
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
            :min="1"
            :max="maxDropCount"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
          <p v-if="!isCardCountValid" class="text-red-500 text-sm mt-1">
            Card count must be between 1 and {{ maxDropCount }}.
          </p>
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
            :disabled="!isCardCountValid"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
import { useCardStore } from "@/stores/card";
import { useUserStore } from "@/stores/user";
const modalStore = useModalStore();
const cardStore = useCardStore();
const userStore = useUserStore();
const dateCredited = ref(new Date().toISOString().substr(0, 10));
const modalData = computed(() => modalStore.getModalData);
const cardCount = ref(modalData.value.SentCount - modalData.value.DropCount);
const allowAnonymizedData = ref(true);
const userName = computed(() => userStore.userName);

const maxDropCount = computed(
  () => modalData.value.SentCount - modalData.value.DropCount
);

const isCardCountValid = computed(() => {
  const count = Number(cardCount.value);
  return count > 0 && count <= maxDropCount.value;
});

const closeModal = () => {
  modalStore.setCloseAllModals();
};

console.log("modal", modalData.value);

const submitPost = () => {
  if (!isCardCountValid.value) return;

  const drop = {
    PK: modalData.value.PK,
    SK: modalData.value.SK,
    BatchId: modalData.value.BatchId,
    SiteId: modalData.value.SiteId,
    SentDate: modalData.value.DateSent,
    dropCount: Number(cardCount.value),
    dropDate: new Date(dateCredited.value).getTime(),
    userName: userName.value,
  };

  cardStore.addDrop(drop);
  closeModal();
};
</script>
