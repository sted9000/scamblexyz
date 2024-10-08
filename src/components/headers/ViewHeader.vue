<template>
  <div class="flex justify-between items-center mx-4 mt-4 -mb-2">
    <h1 class="text-3xl font-bold p-2">{{ props.title }}</h1>
    <button
      v-if="props.showButton"
      @click="$emit('buttonClick')"
      :class="['rounded-full p-2', buttonColorClass, hoverColorClass]"
    >
      <component :is="props.icon" class="w-6 h-6" />
    </button>
  </div>
  <div class="divider" />
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  title: String,
  showButton: Boolean,
  icon: Object,
  color: String,
});

defineEmits(["buttonClick"]);

const buttonColorClass = computed(() => {
  const colorMap = {
    indigo: "bg-indigo-50",
  };
  return colorMap[props.color] || "bg-gray-50";
});

const hoverColorClass = computed(() => {
  const colorMap = {
    indigo: "hover:bg-indigo-100",
  };
  return colorMap[props.color] || "hover:bg-gray-100";
});
</script>
