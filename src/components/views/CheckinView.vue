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
              <div class="stat-value text-primary">12</div>
            </div>
            <div class="stat-desc">11 Checked In Already</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Current Streak</div>
            <div className="stat-value text-primary flex items-center">
              <BoltIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">
                {{ currentStreak }} Days
              </div>
            </div>
            <div class="stat-desc">Leader has a 424 day streak</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Checkin Points</div>
            <div className="stat-value flex items-center text-primary">
              <ArrowUpIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">2342</div>
            </div>
            <div class="stat-desc">Earned 234 yesterday</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Community Rank</div>
            <div className="stat-value flex items-center text-primary">
              <UserGroupIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">6th</div>
            </div>
            <div class="stat-desc">15 points behind 5th</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Streaking Sites</div>
            <div className="stat-value text-primary flex items-center">
              <FlagIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{ sites }}</div>
            </div>
            <div class="stat-desc">Of 24 Possible</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Max Streak</div>
            <div className="stat-value text-primary flex items-center">
              <GlobeAltIcon class="h-8 w-8 mr-2" />
              <div class="stat-value text-primary">{{ max }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <CheckinSection />
</template>

<script setup>
import { computed, defineProps } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
// import PageInfoComponent from "@/components/PageInfoComponent.vue";
import {
  CheckBadgeIcon,
  BoltIcon,
  ArrowUpIcon,
  FlagIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
import CheckinSection from "@/components/checkin/CheckinSection.vue";
import { useCheckinStore } from "@/stores/checkin";
const checkinStore = useCheckinStore();
const props = defineProps(["title"]);
const checkins = computed(() => checkinStore.getEnabledCheckin);

// Current Streak is the checkin with the highest currentStreak
const currentStreak = computed(() => {
  const streaks = checkins.value.map((checkin) => checkin.currentStreak);
  return Math.max(...streaks);
});

// Cumulative Streak is the sum of all checkins currentStreak
// const cumulativeStreak = computed(() => {
//   return checkins.value.reduce(
//     (acc, checkin) => acc + checkin.currentStreak,
//     0
//   );
// });

// Sites is the number of checkins that have currentStreak > 0
const sites = computed(() => {
  return checkins.value.filter((checkin) => checkin.currentStreak > 0).length;
});

// Max is the value of the checkin with the highest longestStreak
const max = computed(() => {
  const streaks = checkins.value.map((checkin) => checkin.longestStreak);
  return Math.max(...streaks);
});
</script>
