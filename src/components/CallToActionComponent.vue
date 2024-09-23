<template>
  <main>
    <div class="max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div class="text-center">
        <h2
          class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl max-w-3xl mx-auto"
        >
          <span class="animated-text">Have Fun</span>
          <span> and Never Miss a Sweepstakes</span>
          <span class="animated-text"> Reward</span>
          <span> Again</span>
        </h2>
        <p
          class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
        >
          {{ CTA_DESCRIPTION }}
        </p>
        <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div
            class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button
              @click="handleGetStarted()"
              class="px-6 py-3 text-white font-medium rounded-full animated-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 min-w-[200px]"
            >
              Get Started
            </button>
            <button
              class="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-full border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 min-w-[200px]"
              @click="handleLearnMore"
            >
              Learn more
            </button>
          </div>
        </div>
        <div class="mt-3">
          <p class="text-sm text-gray-400">{{ SELLING_POINT }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineProps } from "vue";
import "@/assets/css/animatedText.css";
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { CTA_DESCRIPTION, SELLING_POINT } from "@/constants";

const props = defineProps({
  onLearnMore: {
    type: Function,
    required: true,
  },
});

const handleLearnMore = () => {
  props.onLearnMore();
};

const userStore = useUserStore();
const handleGetStarted = async () => {
  // if the user is already signed in, redirect to the app
  if (userStore.isAuthenticated) {
    router.push("/app");
    return;
  } else {
    try {
      await userStore.signIn();
    } catch (error) {
      console.error("Error initiating Google sign-up:", error);
    }
  }
};
</script>
