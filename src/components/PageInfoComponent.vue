<template>
  <div class="mb-4 md:mb-8">
    <SectionHeader :icon="props.headerIcon" :title="props.headerTitle" />
    <div class="flex justify-center space-x-4">
      <div
        v-for="(item, index) in props.dataItems"
        :key="index"
        class="flex flex-col items-center justify-center w-28 h-28 bg-gray-100 rounded-lg p-4"
      >
        <component :is="item.icon" class="w-6 h-6 mb-1 text-gray-600" />
        <span class="text-base font-semibold text-gray-700">{{
          item.value
        }}</span>
        <span class="text-xs text-center text-gray-500">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { defineProps } from "vue";
const props = defineProps({
  headerIcon: Object,
  headerTitle: String,
  dataItems: {
    type: Array,
    required: true,
  },
});
</script>
```
