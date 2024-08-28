<template>
  <div>
    <CallToActionComponent
      :main-description="mainDescription"
      :secondary-description="secondaryDescription"
    />
    <AppPreviewComponent :imagePath="imagePath" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CallToActionComponent from "../components/CallToActionComponent.vue";
import AppPreviewComponent from "../components/AppPreviewComponent.vue";

const mainDescription = ref(
  "Start Learning Pot Limit Omaha Visually and Intuitively!"
);
const secondaryDescription = ref(
  "A modern tool that helps you learn Game Theory Optimal PLO starting ranges with Heatmaps and Quizzes."
);
const imagePath = ref("/images/app-preview/");
</script>
