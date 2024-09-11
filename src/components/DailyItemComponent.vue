<template>
  <div
    @click="itemStatus === 'Available' ? handleClick() : null"
    :class="[
      'p-4 bg-white rounded-xl flex items-center',
      itemStatus === 'Available'
        ? 'cursor-pointer'
        : 'cursor-not-allowed opacity-50',
    ]"
  >
    <img
      :src="site.imagePath"
      alt="Item image"
      class="w-10 h-10 rounded-full mr-4"
    />
    <div class="flex flex-col">
      <h3 class="font-bold text-lg text-gray-900">
        {{ site.fullName }}
      </h3>
      <p v-if="itemStatus === 'Available'" class="text-xs text-green-600 -mt-1">
        Available
      </p>
      <p v-else class="text-xs text-gray-600 -mt-1">{{ itemStatus }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const site = computed(() => {
  return props.item;
});

const isTomorrow = (date) => {
  return new Date(date).getDate() !== new Date().getDate();
};
const itemStatus = computed(() => {
  if (site.value.checkinType === "DAILY") {
    // Check if the site was visited today EST
    const wasCheckedInToday =
      new Date(site.value.lastVisited).getDate() === new Date().getDate();
    if (!wasCheckedInToday) {
      return "Available";
    } else {
      return `Check in tomorrow`;
    }
  } else {
    if (
      site.value.lastVisited <
      Date.now() - site.value.checkinType * 60 * 60 * 1000
    ) {
      return "Available";
    } else {
      const availableTime =
        site.value.lastVisited + site.value.checkinType * 60 * 60 * 1000;
      const isTimeTomorrow = isTomorrow(availableTime);
      if (isTimeTomorrow) {
        return `Available tomorrow`;
      } else {
        return `Available at ${new Date(availableTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      }
    }
  }
});

const emit = defineEmits(["itemClick"]);

const handleClick = () => {
  // open another tab to the site
  window.open(site.value.url, "_blank");

  // emit the item click event
  emit("itemClick", props.item);
};
</script>
