<template>
  <h2
    class="text-xl font-bold text-gray-700 text-left mx-6 mb-4 flex items-center justify-start"
  >
    {{ props.title }}
  </h2>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>
