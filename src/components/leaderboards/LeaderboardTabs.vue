// LeaderboardTabs.vue
<template>
  <div class="tabs tabs-boxed mx-6 mb-6">
    <a
      v-for="period in periods"
      :key="period"
      class="tab"
      :class="{ 'tab-active': props.modelValue === period }"
      @click="$emit('update:modelValue', period)"
    >
      {{ period }}
    </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const periods = ['Today', 'Weekly', 'All Time'];
</script>