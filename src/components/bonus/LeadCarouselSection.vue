<template>
  <div>
    <SectionHeader title="Bonuses " :icon="UserGroupIcon" />
    <div
      class="carousel carousel-center w-full px-4 py-2 space-x-4 rounded-box -mt-2"
    >
      <div v-for="lead in leads" :key="lead.id" class="carousel-item">
        <BonusItem
          :item="lead"
          class="rounded-md p-3 transition-transform hover:scale-105 hover:bg-gray-200"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import BonusItem from "@/components/bonus/BonusItem.vue";
import { UserGroupIcon } from "@heroicons/vue/24/outline";
import { useBonusStore } from "@/stores/bonus";
const bonusStore = useBonusStore();
const leads = computed(() => bonusStore.getCommunityBonus);
</script>
