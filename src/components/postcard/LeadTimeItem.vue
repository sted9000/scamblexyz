<template>
  <div
    class="flex flex-col bg-gray-100 p-4 rounded-lg transition-transform hover:scale-105 hover:bg-gray-200"
  >
    <div class="flex flex-col">
      <div class="flex justify-between mb-2">
      <img
        :src="siteLogo"
        alt="Item image"
        class="w-10 h-10 rounded-full mr-2"
      />

      <div class="flex">
        <CheckIcon
          v-for="i in siteCardRank"
          :key="i"
          class="h-5 w-5 text-yellow-500"
        />
      </div>
    </div>
      <div class="text-2xl font-bold text-gray-700 mr-2">
          {{ siteName }}
        </div>
        <div class="text-sm text-gray-700">
          {{ props.item.leadTime }} since last drop
        </div>
        <div class="text-sm text-gray-700">
          Drops every {{ props.item.leadTime }} weeks
        </div>
      <div>
       
      </div>
    </div>
    <div>
      <div class="text-xs text-gray-500 mt-2">Unconfirmed</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { sites as localSites } from "@/constants";
import { CheckIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["item"]);
const siteName = localSites[props.item.id].fullName;
const siteLogo = localSites[props.item.id].imagePath;
const siteCardRank = computed(() => props.item.cardRanking);
</script>
```
