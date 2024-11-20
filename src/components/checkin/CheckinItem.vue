<template>
  <div
    @click="itemStatus === 'Available' ? handleClick() : null"
    :class="[
      'pl-6 pr-8 py-4 bg-gray-100 rounded-xl relative',
      itemStatus === 'Available'
        ? 'cursor-pointer hover:bg-gray-200'
        : 'cursor-not-allowed opacity-50',
    ]"
  >
    <div class="flex items-center">
      <img
        :src="props.item.imagePath"
        alt="Item image"
        class="w-10 h-10 rounded-full mr-4"
      />
      <div class="flex flex-col">
        <h3 class="font-bold text-lg text-gray-700 truncate">{{ props.item.fullName }}</h3>
        <p v-if="itemStatus === 'Available'" class="text-xs text-gray-700 -mt-1">Available</p>
        <p v-else class="text-xs text-gray-600 -mt-1">{{ itemStatus }}</p>
      </div>
    </div>
    <div v-if="props.item.currentStreak > 0" class="flex items-center absolute bottom-1 right-2 bg-white rounded-full p-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3 text-yellow-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
      <span class="text-xs font-medium text-gray-600 ml-1 pr-0.5">{{ props.item.currentStreak }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { itemStatusFromAvailability } from "@/utils";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const itemStatus = computed(() => {
  return itemStatusFromAvailability(props.item.availability)
});

const emit = defineEmits(["itemClick"]);

const handleClick = () => {
  // open another tab to the site
  window.open(`https://${props.item.Site.url}`, "_blank");

  // emit the item click event
  emit("itemClick", props.item);
};
</script>
