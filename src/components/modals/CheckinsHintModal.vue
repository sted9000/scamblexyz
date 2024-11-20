<template>
    <div
      class="fixed inset-0 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <h2 class="text-2xl font-bold">About Checkins</h2>
        <ul class="list-disc list-inside space-y-3 mt-4">
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Checkins are the easiest risk free way to earn bonuses on all your favorite sweepstakes sites.</span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">To check in, simply click the site and it will launch in a new browser tab making it easy to checkin.</span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">ScambleXYZ keeps track of when you last checked in and will let you know when you can check in again!</span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Climb the ScambleXYZ Leaderboard by earning points for your checkins! Checkins are worth more points the longer your streak is!</span>
          </li>
          <li class="flex items-start">
            <span class="h-5 w-5 text-primary">•</span>
            <span class="ml-2">Configure the sites you want to checkin under Config</span>
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
  