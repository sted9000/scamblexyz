<template>
  <div
    class="flex flex-col bg-gray-100 p-6 rounded-lg"
  >
  
    <div class="flex flex-col">
      <div class="flex justify-between items-start">
        <div class="flex mb-2">
          <img
            :src="siteLogo"
            alt="Item image"
            class="w-10 h-10 rounded-full mr-6"
          />
          <CheckIcon
            v-for="i in siteCardRank"
            :key="i"
            class="h-5 w-5 text-yellow-500"
          />
        </div>
        <div class="text-xs text-white bg-secondary rounded-md px-2 py-1 h-fit">
          Dropped Today!
        </div>
      </div>
      <div class="text-2xl font-bold text-gray-700 mr-2">
          {{ siteName }}
        </div>
      </div>
      
  

      
        
<div class="flex flex-col">
        <div class="flex items-center">
          <CurrencyDollarIcon v-for="i in cardValue" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
        </div>
        <div class="text-sm font-bold text-gray-700">
          6 Week Lead Time
        </div>
        <!-- <div class="divider my-2"></div> -->
        <div class="btn bg-white text-gray-500 text-center mt-4">
          More Info
        </div>
      </div>
    
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { sites as localSites } from "@/constants";
import { CheckIcon, CurrencyDollarIcon } from "@heroicons/vue/24/outline";
const props = defineProps(["item"]);
const siteName = localSites[props.item.id].fullName;
const siteLogo = localSites[props.item.id].imagePath;
const siteCardRank = computed(() => props.item.cardRanking);
const cardValue = 4;
</script>
```
