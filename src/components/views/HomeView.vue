<template>
  <ViewHeader :title="props.title" />
  <HomeLeaderboard />
  <div class="divider px-4" />
  <CommunityInfo />
  <div class="divider px-4" />
  <CheckinCarouselSection />
  <div class="divider px-4" />
  <LeadCarouselSection />
  <!-- <div class="divider px-4" />
  <LatestDropCarouselSection /> -->
</template>

<script setup>
import { defineProps } from "vue";
import ViewHeader from "@/components/headers/ViewHeader.vue";
import HomeLeaderboard from "@/components/leaderboards/HomeLeaderboard.vue";
import CommunityInfo from "@/components/CommunityInfo.vue";
import CheckinCarouselSection from "@/components/checkin/CheckinCarouselSection.vue";
import LeadCarouselSection from "@/components/bonus/LeadCarouselSection.vue";
// import LatestDropCarouselSection from "@/components/postcard/LatestDropCarouselSection.vue";

const props = defineProps({
  title: String,
});
</script>
