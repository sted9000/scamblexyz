<template>
  <ViewHeader :title="props.title" />
  <div class="mb-8">
    <SectionHeader title="Stats" />
    <div class="carousel carousel-center w-full">
      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title">Active Bonuses</div>
            <div className="stat-value flex items-center text-secondary">
              <ChartBarIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">{{ bonusStore.getCountOfBonuses }}</div>
            </div>
            <div class="stat-desc">Offerd this week</div>
          </div>
          <div className="stat">
            <div className="stat-title">New Bonuses</div>
            <div className="stat-value flex items-center text-secondary">
              <SunIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">{{bonusStore.getCountOfBonusesPostedToday}}</div>
            </div>
            <div class="stat-desc">Posted today</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Bonus Points</div>
            <div className="stat-value text-secondard flex items-center">
              <ArrowUpIcon class="h-8 w-8 mr-2 text-secondary" />
              <div class="stat-value text-secondary">{{ realtimeStore.getUserScore('Bonus') }}</div>
            </div>
            <div className="stat-desc">{{ realtimeStore.getUserTodayScore('Bonus') }} Points Earned Today</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Community Rank</div>
            <div className="stat-value text-secondard flex items-center">
              <UserGroupIcon class="h-8 w-8 mr-2 text-secondary" />
              <div class="stat-value text-secondary">{{  communityRankText }}</div>
            </div>
            <div className="stat-desc">{{ pointsBehindText }}</div>
          </div>
        </div>
      </div>



    
    </div>
  </div>
  <!-- Community Bonuses Section -->
  <BonusSection />

  <!-- Users' Bonuses Section -->
  <BonusTable />
</template>

<script setup>
import { defineProps, onMounted, computed } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import BonusSection from "@/components/bonus/BonusSection.vue";
import BonusTable from "@/components/bonus/BonusTable.vue";
import { useBonusStore } from "@/stores/bonus";
import { useRealtimeStore } from "@/stores/realtime";
import { pointsBehindFormatting, communityRankFormatting } from "@/utils";
const realtimeStore = useRealtimeStore();
const bonusStore = useBonusStore();

import {
  SunIcon,
  ArrowUpIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  title: String,
});
const communityRankText = computed(() => {
  return communityRankFormatting(realtimeStore.getUserRank('Bonus'));
});
const pointsBehindText = computed(() => {
  return pointsBehindFormatting('Bonus');
});

onMounted(() => {
  console.log("fetching bonus data");
  bonusStore.fetchUserBonus();
});
</script>
```
