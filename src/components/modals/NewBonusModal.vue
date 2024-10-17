<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold mb-4">Add a Bonus</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- Select Site -->
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

        <!-- Purchase Price -->
        <div>
          <label for="cardCount" class="block text-sm font-medium text-gray-700"
            >Purchase Price</label
          >
          <input
            type="number"
            id="cardCount"
            v-model="amount"
            required
            min="1"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
        </div>

        <!-- Amount Credited -->
        <div>
          <label for="cardCount" class="block text-sm font-medium text-gray-700"
            >Amount Credited</label
          >
          <input
            type="number"
            id="cardCount"
            v-model="bonusAmount"
            required
            min="1"
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          />
        </div>

        <!-- Bonus Type -->
        <div>
          <label for="bonusType" class="block text-sm font-medium text-gray-700"
            >Bonus Type</label
          >
          <select
            id="bonusType"
            v-model="selectedBonusType"
            required
            class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
          >
            <option value="deposit">Deposit Bonus</option>
            <option value="happyhour">Happy Hour</option>
            <option value="signup">Signup Bonus</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Claim Limit -->
        <div>
          <label for="claimLimit" class="block text-sm font-medium text-gray-700">Claim Limit</label>
        
        <select
          id="claimLimit"
          v-model="selectedClaimLimit"
          required
          class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 p-2"
        >
          <option value="1">Single Claim</option>
          <option value="multi">Multi-Claim</option>
          </select>
        </div>

        <!-- Allow Anonymized Data -->
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

        <!-- Submit/Cancel -->
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
import { ref } from "vue";
import { useModalStore } from "@/stores/modal";
import { sites as localSites } from "@/constants";
import { useBonusStore } from "@/stores/bonus";

const modalStore = useModalStore();
const bonusStore = useBonusStore();

const selectedSite = ref(null);
const amount = ref(0);
const bonusAmount = ref(0);
const selectedBonusType = ref("deposit");
const selectedClaimLimit = ref("1");
const sites = Object.values(localSites);
const allowAnonymizedData = ref(true);

const closeModal = () => {
  modalStore.setCloseAllModals();
};

const handleSubmit = () => {
  if (!selectedSite.value || bonusAmount.value <= 0) {
    alert("Please fill in all required fields");
    return;
  }
  bonusStore.addBonus({
    siteId: selectedSite.value,
    amount: amount.value,
    bonusAmount: bonusAmount.value,
    bonusType: selectedBonusType.value,
    claimLimit: selectedClaimLimit.value,
    allowShare: allowAnonymizedData.value,
  });
  closeModal();
};
</script>
