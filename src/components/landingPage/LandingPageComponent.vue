<template>
  <div class="bg-gray-50">
    <!-- <ScrollingTickerComponent
      :mockData="[
        { rank: 1, username: 'PhilIveyIsGOOD', score: 1000 },
        { rank: 2, username: 'JonnyS94', score: 900 },
        { rank: 3, username: 'JennySachs9000', score: 800 },
        { rank: 4, username: 'LadyGG2020', score: 50 },
        { rank: 5, username: 'ThisCouldBeYou10', score: 20 },
        // ... more mock data ...
      ]"
    /> -->
    <HeaderComponent />
    <CallToActionComponent
      :main-description="mainDescription"
      :secondary-description="secondaryDescription"
      :on-learn-more="scrollToAppPreview"
    />

    <AppPreviewComponent
      :firstImage="firstImage"
      :secondImage="secondImage"
      :thirdImage="thirdImage"
      :fourthImage="fourthImage"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CallToActionComponent from "./CallToActionComponent.vue";
// import ScrollingTickerComponent from "../ScrollingTickerComponent.vue";
import AppPreviewComponent from "./AppPreviewComponent.vue";
import HeaderComponent from "../headers/HeaderComponent.vue";

const mainDescription = ref(
  "Start Learning Pot Limit Omaha Visually and Intuitively!"
);
const secondaryDescription = ref(
  "A modern tool that helps you learn Game Theory Optimal PLO starting ranges with Heatmaps and Quizzes."
);

const firstImage = {
  path: "/images/landing/checkin",
  title: "Daily Checkins",
  description:
    "Most of your favorite sweepstakes sites offer daily checkin bonuses. ScambleXYZ makes checking in dead simple. Track your checkins, get on a streak, earn points, and climb the leaderboard.",
};

const secondImage = {
  path: "/images/landing/bonus",
  title: "Discover Bonuses",
  description:
    "Sh#* I Lost My Streak! Don't worry, it happens to the best of us. But with ScambleXYZ, you can get back on track. Check in every day to build your streaks and compare them with your fellow Scamblers.",
};

const thirdImage = {
  path: "/images/landing/leadtime",
  title: "Postcard Info",
  description:
    "Wondering which sites to write request letters to? ScambleXYZ has you covered. We track the lead times for all the major sites and have tools to help you decide where to play.",
};

const fourthImage = {
  path: "/images/landing/leaderboard",
  title: "Realtime Leaderboards",
  description:
    "Compete against your friends and the community on a realtime leaderboard. Gain points for checkins, bonuses, and more.",
};


const scrollToAppPreview = () => {
  const element = document.getElementById("app-preview");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
