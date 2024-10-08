<template>
  <div class="flex items-center justify-between mb-4">
    <div class="w-1/4"></div>
    <!-- Spacer -->
    <h2 class="text-lg font-semibold text-gray-700 flex items-center">
      <component :is="icon" class="w-5 h-5 mr-3" />
      {{ title }}
    </h2>
    <div class="relative inline-block w-1/4">
      <select
        :value="options[selectedIndex]"
        @change="handleOptionChange"
        class="w-full text-gray-500 bg-transparent hover:bg-gray-50 cursor-pointer py-1 pr-8 pl-1 rounded appearance-none focus:outline-none text-right"
      >
        <option v-for="(option, index) in options" :key="index" :value="option">
          {{ option }}
        </option>
      </select>
      <div
        class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"
      >
        <svg
          class="fill-current h-4 w-4 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  selectedIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["optionSelected"]);

const handleOptionChange = (event) => {
  const selectedOption = event.target.value;
  const selectedIndex = props.options.indexOf(selectedOption);
  emit("optionSelected", selectedIndex);
};
</script>
