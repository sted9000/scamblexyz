<template>
  <div>
    <ScrollingTickerComponent
      :mockData="[
        { rank: 1, username: 'PhilIveyIsGOOD', score: 1000 },
        { rank: 2, username: 'JonnyS94', score: 900 },
        { rank: 3, username: 'JennySachs9000', score: 800 },
        { rank: 4, username: 'LadyGG2020', score: 50 },
        { rank: 5, username: 'ThisCouldBeYou10', score: 20 },
        // ... more mock data ...
      ]"
    />
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
import CallToActionComponent from "../components/CallToActionComponent.vue";
import ScrollingTickerComponent from "../components/ScrollingTickerComponent.vue";
import AppPreviewComponent from "../components/AppPreviewComponent.vue";

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

const fourthImage = {
  path: "/images/landing/board",
  title: "Community Message Board",
  description:
    "Information is power. Learn about new sites, share promotion news, and strategize with the community without noise or bad beat stories. Scambling is more fun with friends.",
};

const secondImage = {
  path: "/images/landing/streak",
  title: "Streaks",
  description:
    "Sh#* I Lost My Streak! Don't worry, it happens to the best of us. But with ScambleXYZ, you can get back on track. Check in every day to build your streaks and compare them with your fellow Scamblers.",
};

const thirdImage = {
  path: "/images/landing/leadtime",
  title: "Lead Times",
  description:
    "Wondering which sites to write request letters to? ScambleXYZ has you covered. We track the lead times for all the major sites and have tool to help you decide where to play.",
};

const scrollToAppPreview = () => {
  const element = document.getElementById("app-preview");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>
