<template>
    <ViewHeader :title="props.title" />
    <div class="flex flex-col items-center justify-center h-full">
        <div class="text-2xl font-bold">Coming Soon</div>
        <div class="text-lg">Log your gameplay, track RTP, and discover the best scambling games!</div>
    </div>
    
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  import ViewHeader from "@/components/headers/ViewHeader.vue";
  
  const props = defineProps({
    title: String,
  });
  </script>
  