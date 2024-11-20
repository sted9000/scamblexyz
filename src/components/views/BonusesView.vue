<template>
  <ViewHeader :title="props.title" showHint="true" />
  <div class="mb-8">
    <SectionHeader title="Stats" />
    <div class="carousel carousel-center w-full">
      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title">Active Bonuses</div>
            <div className="stat-value flex items-center text-secondary">
              <ChartBarIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">{{ realtimeStore.getNumberOfBonuses }}</div>
            </div>
            <div class="stat-desc">Offerd this week</div>
          </div>
          <div className="stat">
            <div className="stat-title">New Bonuses</div>
            <div className="stat-value flex items-center text-secondary">
              <SunIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">{{realtimeStore.getNumberOfBonusesToday}}</div>
            </div>
            <div class="stat-desc">Posted today</div>
          </div>
          <div className="stat">
            <div className="stat-title">Claimed Bonuses</div>
            <div className="stat-value flex items-center text-secondary">
              <GiftIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">{{realtimeStore.getTodaysBonuses}}</div>
            </div>
            <div class="stat-desc">Claimed today</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <CommunityStats category="Bonus" />
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
import { defineProps, onMounted } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import BonusSection from "@/components/bonus/BonusSection.vue";
import BonusTable from "@/components/bonus/BonusTable.vue";
import CommunityStats from "../CommunityStats.vue";
import { useBonusStore } from "@/stores/bonus";
import { useRealtimeStore } from "@/stores/realtime";
const realtimeStore = useRealtimeStore();
const bonusStore = useBonusStore();

import {
  SunIcon,
  ChartBarIcon,
  GiftIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  title: String,
});

onMounted(() => {
  console.log("fetching bonus data");
  bonusStore.fetchUserBonus();
});
</script>
```
