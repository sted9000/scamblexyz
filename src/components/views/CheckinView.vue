<template>
  <ViewHeader :title="props.title" showHint="true" />

  <div class="mb-8">
    <SectionHeader title="Stats" showHint="true" hint="checkinHint" />
    <div class="carousel carousel-center w-full">
      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Checkins Available</div>
            <div className="stat-value text-primary flex items-center">
              <CheckBadgeIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{checkinStore.getAvailableCheckin.length}}</div>
            </div>
            <div class="stat-desc">{{ checkinStore.getCheckedInToday }} Checked In Already</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Current Streak</div>
            <div className="stat-value text-primary flex items-center">
              <BoltIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">
                {{ checkinStore.getCurrentStreak }} Days
              </div>
            </div>
            <div class="stat-desc">Max {{ checkinStore.getMaxStreak }} Days</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Streaking Sites</div>
            <div className="stat-value text-primary flex items-center">
              <FlagIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{  checkinStore.getStreakingSites }}</div>
            </div>
            <div class="stat-desc">Of {{ checkinStore.getEnabledCheckin.length }} Possible</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <CommunityStats category="Checkin" />
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Community Checkins</div>
            <div className="stat-value text-primary flex items-center">
              <UserGroupIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{ realtimeStore.getTodaysCheckins }}</div>
            </div>
            <div class="stat-desc">Daily Total</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CheckinSection />
</template>

<script setup>
import { defineProps } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import CommunityStats from "@/components/CommunityStats.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { useRealtimeStore } from "@/stores/realtime";
import { useCheckinStore } from "@/stores/checkin";
import {
  CheckBadgeIcon,
  BoltIcon,
  FlagIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import CheckinSection from "@/components/checkin/CheckinSection.vue";
const checkinStore = useCheckinStore();
const realtimeStore = useRealtimeStore();

const props = defineProps(["title"])



</script>
