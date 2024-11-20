<template>
  <div
    class="flex flex-col bg-gray-100 p-6 rounded-lg"
  >
  
    <div class="flex flex-col">
      <div class="flex justify-between items-start">
        <div class="flex mb-2">
          <img
            :src="item.imagePath"
            alt="Item image"
            class="w-10 h-10 rounded-full mr-6"
          />
        </div>
        <div v-if="false" class="badge text-xs">
          Last Drop September 22th
        </div>
      </div>
      <div class="text-2xl font-bold text-gray-700 mr-2">
          {{ item.fullName }}
      </div>
      <div class="text-sm text-gray-500">Last Drop: September 22th</div>
      </div>
      
  

      
        
  <div class="flex flex-col mt-4">
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Value: </div>
          <CurrencyDollarIcon v-for="i in siteValues.postcardValue" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
        </div>
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Lead Time: </div>
          <template v-if="siteValues.postcardLeadTime > 5">
            <CalendarIcon v-for="i in 5" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
            <span class="text-sm text-yellow-500">+{{ siteValues.postcardLeadTime - 5 }}</span>
          </template>
          <template v-else>
            <CalendarIcon v-for="i in siteValues.postcardLeadTime" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
          </template>
        </div>
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Consistancy: </div>
          <StarIcon v-for="i in siteValues.postcardConsistancy" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
        </div>
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Popularity: </div>
          <HandThumbUpIcon v-for="i in siteValues.postcardPopularity" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
        </div>
        <!-- <div class="divider my-2"></div> -->
        <div class="flex justify-end mt-2">
          <button @click="openSiteModal" class="btn btn-sm bg-white text-gray-500">More Details</button>
        </div>
      </div>
    
  </div>
  
</template>

<script setup>
import { defineProps, computed } from "vue";
import { useModalStore } from "@/stores/modal";
import { usePostcardStore } from "@/stores/postcard";
import { CalendarIcon, StarIcon, CurrencyDollarIcon, HandThumbUpIcon } from "@heroicons/vue/20/solid";
import { postcardSiteValues } from "@/utils";
const props = defineProps(["item"]);
const siteValues = computed(() => postcardSiteValues(props.item.Site));

const modalStore = useModalStore();
const postcardStore = usePostcardStore();
const openSiteModal = () => {
  postcardStore.fetchPostcardSite(props.item.siteId);
  modalStore.setOpenModal("postcardSite");
};
</script>
```
