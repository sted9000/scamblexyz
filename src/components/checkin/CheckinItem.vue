<template>
  <div
    @click="itemStatus === 'Available' ? handleClick() : null"
    :class="[
      'px-6 py-4 bg-gray-100 rounded-xl flex items-center',
      itemStatus === 'Available'
        ? 'cursor-pointer hover:bg-gray-200'
        : 'cursor-not-allowed opacity-50',
    ]"
  >
    <img
      :src="site.imagePath"
      alt="Item image"
      class="w-10 h-10 rounded-full mr-4"
    />
    <div class="flex flex-col">
      <h3 class="font-bold text-lg text-gray-700">
        {{ site.fullName }}
      </h3>
      <p v-if="itemStatus === 'Available'" class="text-xs text-gray-700 -mt-1">
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

// See if the site is available to check in
const itemStatus = computed(() => {
  // If lastVisit is null, then the site has never been visited
  if (!site.value.lastVisit) {
    return "Available";
  }

  // Daily Checkin
  // See if the last checkin was after the today at checkinTime
  if (site.value.checkinType === "daily") {
    // Today at the checkin time
    // Note that the checkinTime is in 00:00:00 formait
    const todayCheckinTime = new Date().setHours(
      site.value.checkinTime.split(":")[0],
      site.value.checkinTime.split(":")[1]
    );
    // Compare
    if (new Date(site.value.lastVisit) < new Date(todayCheckinTime)) {
      return "Available";
    } else {
      return `Check in tomorrow`;
    }
  }

  // Hourly Checkin
  // Set next available time
  const nextAvailableTime =
    site.value.lastVisit + site.value.hourlyCheckinReset * 60 * 60 * 1000;

  // Compare
  if (nextAvailableTime < Date.now()) {
    return "Available";
  } else {
    return `Available at ${new Date(nextAvailableTime).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
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
