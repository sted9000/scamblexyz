// Leaderboard.vue
<template>
  <div class="flex flex-col h-screen border-l-2 border-gray-200">
    <SectionHeader
      :title="title"
      class="mt-6"
    />

    <LeaderboardTabs
      v-model="selectedPeriod"
    />

    <div class="flex flex-col gap-4 px-6 pb-16">
      <TransitionGroup
        name="list"
        tag="div"
      >
        <LeaderboardPlayer
          v-for="player in players"
          :key="player.userId"
          :player="player"
          :is-highlighted="highlightedPlayerId === player.userId"
          :has-moved="movedPlayerId === player.userId"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps } from 'vue';
import SectionHeader from "@/components/headers/SectionHeader.vue";
import LeaderboardTabs from './LeaderboardTabs.vue';
import LeaderboardPlayer from './LeaderboardPlayer.vue';
import { useRealtimeStore } from '@/stores/realtime';

const realtimeStore = useRealtimeStore();

const PAGE_MAPPINGS = {
  Home: { title: 'Overall Leaderboard', key: 'overall' },
  Bonuses: { title: 'Bonus Leaderboard', key: 'bonus' },
  Checkins: { title: 'Check-in Leaderboard', key: 'checkin' },
  Postcards: { title: 'Postcard Leaderboard', key: 'postcard' }
};

const PERIOD_MAPPINGS = {
  'Today': 'Today',
  'Weekly': 'Weekly',
  'All Time': 'AllTime'
};

const props = defineProps({
  currentPage: {
    type: String,
    required: true
  }
});

const selectedPeriod = ref('Today');
const highlightedPlayerId = ref(null);
const movedPlayerId = ref(null);

const title = computed(() => 
  PAGE_MAPPINGS[props.currentPage]?.title ?? 'Leaderboard'
);

const currentPageKey = computed(() => 
  PAGE_MAPPINGS[props.currentPage]?.key ?? 'overall'
);

const periodKey = computed(() => 
  PERIOD_MAPPINGS[selectedPeriod.value] ?? 'AllTime'
);

const players = computed(() => {
  const key = `${currentPageKey.value}${periodKey.value}`;
  return realtimeStore[key];
});

// Watch for changes in player scores or positions
watch(players, (newPlayers, oldPlayers) => {
  if (!oldPlayers) return;
  
  newPlayers.forEach((player, index) => {
    const oldPlayer = oldPlayers.find(p => p.userId === player.userId);
    if (!oldPlayer) return;

    // Highlight score changes
    if (player.score !== oldPlayer.score) {
      highlightedPlayerId.value = player.userId;
      setTimeout(() => {
        highlightedPlayerId.value = null;
      }, 1000);
    }

    // Highlight position changes
    const oldIndex = oldPlayers.findIndex(p => p.userId === player.userId);
    if (oldIndex !== index) {
      movedPlayerId.value = player.userId;
      setTimeout(() => {
        movedPlayerId.value = null;
      }, 1000);
    }
  });
}, { deep: true });
</script>

<style>
.list-move {
  transition: transform 0.5s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>