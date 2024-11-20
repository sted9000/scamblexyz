<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
      <h2 class="text-2xl font-bold">About Bonuses</h2>
      <ul class="list-disc list-inside space-y-3 mt-4">
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Sweepstakes sites offer many different types of bonuses that can be quite lucrative.</span>
        </li>
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Discover bonuses that other community members have posted and track your own!</span>
        </li>
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Filter and sort for recommended bonuses, new bonuses, and more!</span>
        </li>
        <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Log you bonuses by hovering over the bonus and clicking "Record". If you have a bonus that is not listed, you can add track it by clicking "New Bonus".</span>
          </li>
        <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Climb the ScambleXYZ Leaderboard by earning points for logging your bonuses!</span>
          </li>
        <li class="flex items-start">
          <span class="h-5 w-5 text-primary">•</span>
          <span class="ml-2">Configure the sites you want to see bonuses for under Config</span>
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