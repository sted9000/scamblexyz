<template>
    <div
      class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      @click.self="closeModal"
    >
    <div v-if="loadingPostcardSite">
        <span class="loading loading-spinner loading-md"></span>
    </div>
      <div v-else
        class="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
      <div class="flex flex-col">
      <div class="flex justify-between items-start">
        <div class="flex mb-2">
          <img
            :src="postcardSite.imagePath"
            alt="Item image"
            class="w-10 h-10 rounded-full mr-6"
          />
        </div>
        <div class="badge text-xs">
          Updated {{ dateToMMMDDYYYY(postcardSite.updatedAt) }}
        </div>
      </div>
      <div class="text-2xl font-bold text-gray-700 mr-2">
          {{ postcardSite.fullName }}
      </div>
      <div class="text-sm text-gray-500">Last Drop: September 22th</div>

      <div class="flex flex-col mt-4">
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Value: </div>
          <div class="text-sm text-gray-500"> ${{ postcardSite.postcardValue }}</div>
          <div class="text-sm text-gray-500 mx-1">|</div>
           <CurrencyDollarIcon v-for="i in siteValues.postcardValue" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
          
        </div>
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Lead Time: </div>
          <div class="text-sm text-gray-500">{{ postcardSite.postcardLeadTime }} days</div>
          <div class="text-sm text-gray-500 mx-1">|</div>
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
          <div class="text-sm text-gray-500">{{ postcardSite.postcardConsistancy }}</div>
          <div class="text-sm text-gray-500 mx-1">|</div>
          <StarIcon v-for="i in siteValues.postcardConsistancy" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
        </div>
        <div class="flex items-center mb-2">
          <div class="text-sm text-gray-500 mr-1">Popularity: </div>
          <div class="text-sm text-gray-500">{{ postcardSite.postcardPopularity }}</div>
          <div class="text-sm text-gray-500 mx-1">|</div>
          <HandThumbUpIcon v-for="i in siteValues.postcardPopularity" :key="i" class="h-4 w-4 text-yellow-500 mr-1" />
        </div>
        </div>
      </div>

      <!-- Table of Recent Drops -->
      <div class="overflow-x-auto mt-4">
        <div class="text-lg font-bold">Latest Drops</div>
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Date</th>
        <th>Cards Dropped</th>
        <th>Sent On</th>
        <th>Lead Time</th>
        <th>Source</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="postcardSite.Drops.length === 0">
        <td colspan="6" class="text-center">No drops found</td>
      </tr>
      <tr v-else v-for="(drop, index) in postcardSite.Drops" :key="drop.id">
        <th>{{ index + 1 }}</th>
        <td>{{ dateToMMMDDYYYY(drop.dropDate) }}</td>
        <td>{{ drop.cardsProcessed }}</td>
        <td>{{ dateToMMMDDYYYY(drop.Batches[0].submissionDate) }}</td>
        <td>{{ differenceInDates(drop.dropDate, drop.Batches[0].submissionDate) }}</td>
        <td>{{ drop.source[0].toUpperCase() + drop.source.slice(1) }}</td>
      </tr>
    </tbody>
        </table>
      </div>
    </div>  
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useModalStore } from "@/stores/modal";
  import { dateToMMMDDYYYY, differenceInDates } from "@/formatDates";
  import { usePostcardStore } from "@/stores/postcard";
  import { CurrencyDollarIcon, CalendarIcon, StarIcon, HandThumbUpIcon } from "@heroicons/vue/20/solid";
  import { postcardSiteValues } from "@/utils";
  const modalStore = useModalStore();
  const postcardStore = usePostcardStore();
  const loadingPostcardSite = computed(() => postcardStore.getLoadingPostcardSite);
  const postcardSite = computed(() => {
    return postcardStore.getPostcardSite;
  }); 

  const siteValues = computed(() => postcardSiteValues(postcardSite.value));
  
  const closeModal = () => {
    modalStore.setCloseAllModals();
  };
  </script>
