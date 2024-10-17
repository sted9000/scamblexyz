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
            <img src="/images/profile/2.png" class="h-8 w-8 mr-2" />
            <div class="stat-value">{{leaderboardStore.getYesterdaysLeaderboardWinner?.username }}</div>
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
              <div class="stat-value">{{  userRank }}</div>
            </div>
          <div className="stat-desc"> {{  pointsBehind }}</div>
        </div>
      </div>
    </div>

    <div class="carousel-item">
      <div className="carousel-item stats ml-4 bg-gray-100 text-gray-700">
        <div className="stat">
          <div className="stat-title text-gray-700">Checkins</div>
          <div className="stat-value flex items-center text-primary">
            <UserGroupIcon class="h-8 w-8 mr-2" />
            <div className="stat-value">{{leaderboardStore.getTodaysCheckins}}</div>
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
            <div className="stat-value">{{bonusStore.getNumberOfBonuses}}</div>
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
            <div className="stat-value">{{postcardStore.getNumberOfDropsToday}}</div>
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
import { useLeaderboardStore } from "@/stores/realtime"; 
import { useBonusStore } from "@/stores/bonus";
import { useAuthStore } from "@/stores/auth";
import { usePostcardStore } from "@/stores/postcard";
const authStore = useAuthStore();
const leaderboardStore = useLeaderboardStore();
const bonusStore = useBonusStore();
const postcardStore = usePostcardStore();
const username = computed(() => authStore.getUsername);
const userRank = computed(() => {
  return leaderboardStore.getUserRank;
});
const pointsBehind = computed(() => {
  return 'Test';
  // if (userRank.value === 1) {
  //   return "You're #1!";
  // } else {
  //   return `${leaderboardStore.getUserPointsBehind(userRank.value)} Points Behind`;
  // }
});
</script>