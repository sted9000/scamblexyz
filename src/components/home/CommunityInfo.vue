<template>
  <SectionHeader title="Community" />
  <div class="carousel carousel-center w-full">

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">
            Yesterday's Leaderboard Winner
          </div>
          <div className="stat-value text-info flex items-center">
            <img :src="yesterdaysWinnerIcon" class="h-8 w-8 mr-2" />
            <div class="stat-value">{{yesterdaysWinnerUsername }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <div className="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat text-info">
          <div className="stat-title text-gray-700">Your Rank</div>
          <div className="stat-value flex items-center">
              <TrophyIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">{{  realtimeStore.getUserRank('Overall') }}</div>
            </div>
          <!-- <div className="stat-desc"> {{  pointsBehind }}</div> -->
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div className="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Checkins</div>
          <div className="stat-value flex items-center text-primary">
            <UserGroupIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">{{realtimeStore.getTodaysCheckins}}</div>
          </div>
          <div class="stat-desc">Checkins Today</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Bonuses</div>
          <div className="stat-value flex items-center text-secondary">
            <GiftIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">{{realtimeStore.getNumberOfBonuses}}</div>
          </div>
          <div class="stat-desc">Claimed Today</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Drops</div>
          <div className="stat-value flex items-center text-accent">
            <EnvelopeOpenIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">{{realtimeStore.getNumberOfDropsToday}}</div>
          </div>
          <div class="stat-desc">Envelopes Dropped Today</div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { GiftIcon, UserGroupIcon, TrophyIcon, EnvelopeOpenIcon } from "@heroicons/vue/24/outline";
import { useRealtimeStore } from "@/stores/realtime"; 
const realtimeStore = useRealtimeStore();

const yesterdaysWinnerIcon = computed(() => {
  if (realtimeStore.getYesterdaysLeaderboardWinner) {
    return `/images/profile/${realtimeStore.getYesterdaysLeaderboardWinner.userIcon}.png`;
  } else {
    return "/images/profile/0.png";
  }
}); 
const yesterdaysWinnerUsername = computed(() => {
  if (realtimeStore.getYesterdaysLeaderboardWinner) {
    return realtimeStore.getYesterdaysLeaderboardWinner.username;
  } else {
    return "0";
  }
});

</script>