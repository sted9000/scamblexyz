<template>
  <ViewHeader :title="props.title" />
  <div class="flex justify-center space-x-4 mb-4">
    <select v-model="timeFrame" class="select select-bordered w-full max-w-xs">
      <option>Today</option>
      <option>Yesterday</option>
      <option>Last Week</option>
      <option>All-time</option>
    </select>
    
    <select v-model="category" class="select select-bordered w-full max-w-xs">
      <option>Check-ins</option>
      <option disabled  >Overall (coming soon)</option>
      <option disabled>Postcards (coming soon)</option>
      <option disabled>Bonuses (coming soon)</option>
      
    </select>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 mx-4 sm:mx-8 md:mx-12 lg:mx-24">
    <div v-for="user in leaderboard" :key="user.id" class="bg-white p-4 flex items-center">
      <div class="text-md font-bold text-gray-700 mr-4">{{ user.rank }}</div>
      <div class="w-8 h-8 rounded-full overflow-hidden mr-4">
        <img :src="`/images/profile/${user.userIcon}.png`" :alt="user.name" class="w-full h-full object-cover">
      </div>
      <div class="flex-grow">
        <div class="text-lg font-semibold">{{ user.score }} points</div>
        <div class="text-lg text-gray-600">{{ user.username }}</div>
        <div class="text-md text-gray-400">Joined {{ user.createdAt }}</div>
      </div>
    </div>
  </div>
  
  <LeaderboardComponent />
</template>

<script setup>
import { defineProps, ref, computed } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import LeaderboardComponent from "@/components/leaderboards/LeaderboardComponent.vue";
import { useLeaderboardStore } from "@/stores/realtime";

const props = defineProps({
  title: String,
});

const leaderboardStore = useLeaderboardStore();
const timeFrame = ref("Today");
const category = ref("Check-ins");
const leaderboard = computed(() => {
  return leaderboardStore.getLeaderboard(timeFrame.value, category.value);
});
</script>
