<template>
  <div
    class="flex flex-col min-h-screen bg-gray-50 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <HeaderComponent />
    <div flex-grow>
      <router-view></router-view>
    </div>
    <div class="mt-auto">
      <FooterComponent />
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";
</script>

<style>
body {
  background-color: #f9fafb;
}
</style>
