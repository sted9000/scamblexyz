<template>
  <header class="bg-gray-50">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex-shrink-0">
          <div class="relative">
            <router-link to="/" class="text-2xl font-bold animated-text">{{
              APP_NAME
            }}</router-link>
            <span
              class="absolute right-0 -bottom-3 text-[0.6rem] text-gray-500 hidden sm:inline"
              >by {{ SPONSOR }}</span
            >
          </div>
        </div>
        <NavigationComponent />
      </div>
    </div>
  </header>
</template>

<script setup>
import "@/assets/css/animatedText.css";
import NavigationComponent from "@/components/NavigationComponent.vue";
import { APP_NAME, SPONSOR } from "@/constants";
</script>
