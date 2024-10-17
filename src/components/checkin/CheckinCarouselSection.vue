<template>
  <div class="my-4">
    <SectionHeader title="Checkins" :icon="CurrencyDollarIcon" />
    <div>
      <div
        class="carousel carousel-center w-full px-4 py-2 space-x-4 rounded-box -mt-2"
      >
        <div
          v-for="item in items"
          :key="item.SiteId"
          class="carousel-item"
        >
          <CheckinItem
            :item="item"
            @itemClick="handleCheckin"
            class="rounded-md p-3 transition-transform hover:scale-105"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import CheckinItem from "@/components/checkin/CheckinItem.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { CurrencyDollarIcon } from "@heroicons/vue/24/outline";
import { useCheckinStore } from "@/stores/checkin";

const checkinStore = useCheckinStore();
const checkins = computed(() => checkinStore.getEnabledCheckin);

const handleCheckin = async (item) => {
  await checkinStore.updateCheckin(item);
};

const items = computed(() => {
  return checkins.value.filter((site) => {
    if (site.lastVisit === null) {
      return true;
    }
    if (site.checkinType === "daily") {
      // Return false if the dates are the same
      return (
        new Date(site.lastVisit).toDateString() !== new Date().toDateString()
      );
    }
    return (
      site.lastVisit < Date.now() - site.hourlyCheckinReset * 60 * 60 * 1000
    );
  });
});
</script>
