<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Track Your Cards</h2>
      <form @submit.prevent="submitPost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Site</label
          >
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
                required
              />
              <img :src="site.image" :alt="site.label" class="w-3 h-3 mr-2" />
              {{ site.label }}
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
import { useCardStore } from "@/stores/card";
import { useUserStore } from "@/stores/user";
const modalStore = useModalStore();
const cardStore = useCardStore();
const userStore = useUserStore();
const cardCount = ref(0);
const cardSite = ref("");
const cardSites = computed(() =>
  userStore.getCardSites.map((site) => {
    return {
      label: site.fullName,
      value: site.SK,
      image: site.imagePath,
      SK: site.SK,
      activeClass: "bg-gray-700 border-gray-800 text-white",
      inactiveClass: "bg-white text-gray-700 border-gray-300 hover:bg-gray-300",
    };
  })
);
const dateSent = ref(new Date().toISOString().split("T")[0]);
const allowAnonymizedData = ref(true);

const closeModal = () => {
  modalStore.setCloseAllModals();
};

const submitPost = () => {
  if (!cardSite.value || cardCount.value <= 0 || !dateSent.value) {
    alert("Please fill in all required fields");
    return;
  }
  // turn date into timestamp
  const timestamp = new Date(dateSent.value).getTime();
  const newPost = {
    sentCount: cardCount.value,
    dateSent: timestamp,
    allowShare: allowAnonymizedData.value,
    siteId: cardSite.value,
  };
  // console.log(newPost);
  cardStore.addBatch(newPost);
  closeModal();
};
</script>
