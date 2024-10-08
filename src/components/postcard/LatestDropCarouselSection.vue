<template>
  <div class="mt-4 mb-8">
    <SectionHeader title="Lastest Drops" :icon="ArrowDownIcon" />
    <div
      class="carousel carousel-center w-full px-4 py-2 space-x-2 rounded-box -mt-2"
    >
      <div
        class="carousel-item px-2"
        v-for="drop in latestDrops"
        :key="drop.id"
      >
        <LatestDropItem :item="drop" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import LatestDropItem from "@/components/postcard/LatestDropItem.vue";
import { ArrowDownIcon } from "@heroicons/vue/24/outline";
import { usePostcardStore } from "@/stores/postcard";
import { sites as localSites } from "@/constants";
const postcardStore = usePostcardStore();
const latestDrops = computed(() => {
  return postcardStore.getDrops.map(drop => {
    return {
      ...drop,
      ...localSites[drop.siteId],
    };
  });
});

</script>
```