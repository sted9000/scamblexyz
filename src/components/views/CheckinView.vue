<template>
  <ViewHeader :title="props.title" />

  <div class="mb-8">
    <SectionHeader title="Stats" />
    <div class="carousel carousel-center w-full">
      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Checkins Available</div>
            <div className="stat-value text-primary flex items-center">
              <CheckBadgeIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{checkinStore.getNumberOfCheckinsAvailable}}</div>
            </div>
            <div class="stat-desc">{{ checkinStore.getNumberOfEnabledCheckinSites - checkinStore.getNumberOfCheckinsAvailable }} Checked In Already</div>
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
            <div class="stat-desc">Of {{ userStore.getEnabledSites.length }} Possible</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Checkin Points</div>
            <div className="stat-value text-secondard flex items-center">
              <ArrowUpIcon class="h-8 w-8 mr-2 text-primary" />
              <div class="stat-value text-primary">1350</div>
            </div>
            <div className="stat-desc">24 Points Earned Today</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Community Rank</div>
            <div className="stat-value text-secondard flex items-center">
              <UserGroupIcon class="h-8 w-8 mr-2 text-primary" />
              <div class="stat-value text-primary">2nd</div>
            </div>
            <div className="stat-desc">35 Points Behind 1st Place</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Community Checkins</div>
            <div className="stat-value text-primary flex items-center">
              <UserGroupIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{ leaderboardStore.getTodaysCheckins }}</div>
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
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { useLeaderboardStore } from "@/stores/realtime";
import { useCheckinStore } from "@/stores/checkin";
import { useUserStore } from "@/stores/user";
import {
  CheckBadgeIcon,
  BoltIcon,
  FlagIcon,
  UserGroupIcon,
  ArrowUpIcon,
} from "@heroicons/vue/24/outline";
import CheckinSection from "@/components/checkin/CheckinSection.vue";

const checkinStore = useCheckinStore();
const leaderboardStore = useLeaderboardStore();
const userStore = useUserStore();
const props = defineProps(["title"])
</script>