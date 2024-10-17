<template>
    <div class="flex flex-col h-screen border-l-2 border-gray-200">
      <SectionHeader
        :title="title"
        class="mt-6"
      />

      <!-- Select Tabs -->
      <div class="tabs tabs-boxed mx-6 mb-6">
        <a 
          class="tab" 
          :class="{ 'tab-active': selectedPeriod === 'Today' }"
          @click="selectPeriod('Today')"
        >
          Today
        </a>
        <a 
          class="tab" 
          :class="{ 'tab-active': selectedPeriod === 'Weekly' }"
          @click="selectPeriod('Weekly')"
        >
          Weekly
        </a>
        <a 
          class="tab" 
          :class="{ 'tab-active': selectedPeriod === 'All Time' }"
          @click="selectPeriod('All Time')"
        >
          All Time
        </a>
      </div>

      <!-- Players -->
      <div class="flex flex-col gap-4 px-12">
        <div v-for="player in players" :key="player.id">
          <div class="flex justify-between">
            
            <div class="flex items-center gap-2">
                <div class="font-bold text-sm text-gray-500 w-6">{{ player.rank }}</div>
                <img :src="`/images/profile/${player.userIcon}.png`" class="w-6 h-6 rounded-full" />
                <div class="font-bold text-md text-gray-700">{{ player.username }}</div>
            </div>
            
            <div class="font-bold text-md text-gray-700">{{ player.score }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps } from 'vue';
  import SectionHeader from "@/components/headers/SectionHeader.vue";
  import { useLeaderboardStore } from '@/stores/realtime';
  const leaderboardStore = useLeaderboardStore();

  const props = defineProps({
    currentPage: {
      type: String,
      required: true
    }
  });

  const title = computed(() => {
    if (props.currentPage === 'Home') {
      return 'Overall Leaderboard';
    } else if (props.currentPage === 'Bonuses') {
      return 'Bonus Leaderboard';
    } else if (props.currentPage === 'Checkins') {
      return 'Check-in Leaderboard';
    } else if (props.currentPage === 'Postcards') {
      return 'Postcard Leaderboard';
    }
    return 'Leaderboard';
  });

  const selectedPeriod = ref('Today');

  const selectPeriod = (period) => {
    selectedPeriod.value = period;
  };

  const currentPageKey = computed(() => {
    if (props.currentPage === 'Home') {
      return 'overall';
    } else if (props.currentPage === 'Bonuses') {
      return 'bonus';
    } else if (props.currentPage === 'Checkins') {
      return 'checkin';
    } else if (props.currentPage === 'Postcards') {
      return 'postcard';
    }
    return 'overall';
  });

  const periodKey = computed(() => {
    if (selectedPeriod.value === 'Today') {
      return 'Today';
  } else if (selectedPeriod.value === 'Weekly') {
    return 'Weekly';
  } else if (selectedPeriod.value === 'All Time') {
    return 'AllTime';
  }
    return 'AllTime';
  });

  const players = computed(() => {
    // Construct the key based on the current page and period
    console.log("currentPageKey", currentPageKey.value);
    const key = `${currentPageKey.value}${periodKey.value}`;
    return leaderboardStore[key];
  });
  </script>
  