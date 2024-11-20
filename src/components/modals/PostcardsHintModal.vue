<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold">About Postcards</h2>
      <ul class="list-disc list-inside space-y-3 mt-4">
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Some sweepstakes sites offer postcards as an Alternative Method of Entry (AMOE), meaning that you receive sweepscoins by mailing in a postcards.</span>
        </li>
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Track your postcard submissions and sweepscoins earned!</span>
        </li>
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Learn the differences between sites in terms of postcard value, processing times, and more!</span>
        </li>
        <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Climb the ScambleXYZ Leaderboard by tracking your postcards!</span>
        </li>
      </ul>
 
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

const closeModal = () => {
  modalStore.setCloseAllModals();
};
</script>