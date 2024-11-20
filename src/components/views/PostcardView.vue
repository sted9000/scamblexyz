<template>
  <ViewHeader :title="props.title" showHint="true" />

  <!-- Stats Section -->
  <div class="mb-8">
    <SectionHeader title="Stats" />
    <div class="carousel carousel-center w-full">
      
      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Total</div>
            <div className="stat-value text-secondard flex items-center">
              <EnvelopeIcon class="h-8 w-8 mr-2 text-accent" />
              <div class="stat-value text-accent">{{postcardStore.getTotalCards}}</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Credited</div>
            <div className="stat-value text-secondard flex items-center">
              <EnvelopeOpenIcon class="h-8 w-8 mr-2 text-accent" />
              <div class="stat-value text-accent">{{postcardStore.getTotalCreditedCards}}</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Pending</div>
            <div className="stat-value text-accent flex items-center">
              <ClockIcon class="h-8 w-8 mr-2 " />
              <div class="stat-value">{{ postcardStore.getTotalPendingCards }}</div>
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Denied</div>
            <div className="stat-value text-accent flex items-center">
              <TrashIcon class="h-8 w-8 mr-2" />
              <div class="stat-value"> {{ postcardStore.getTotalRejectedCards }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <CommunityStats category="Postcard" />
        </div>
      </div>

      
    </div>
  </div>

  <!-- Lead Times Section -->
  <SectionHeader title="Write-In Information" />
  <div class="mt-4 mb-8">
    <div class="flex items-center gap-2 mb-3 px-6 -mt-2">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedSort }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectSort('Recommended')">Recommended</a></li>
          <li><a @click="selectSort('Most Popular')">Most Popular</a></li>
          <li><a @click="selectSort('Highest Value')">Highest Value</a></li>
          <li><a @click="selectSort('Latest Drops')">Latest Drops</a></li>
        </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedValue }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectValue('All Values')">All Sites</a></li>
          <li><a @click="selectValue('Over $5')">Over $5</a></li>
          <li><a @click="selectValue('$5')">$5</a></li>
          <li><a @click="selectValue('$4')">$4</a></li>
          <li><a @click="selectValue('$3')">$3</a></li>
          <li><a @click="selectValue('$Under $3')">Under $3</a></li>
        </ul>
        </div>
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn my-1 mr-1">{{ selectedLeadTime }}</div>
        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
          <li><a @click="selectLeadTime('All Lead Times')">All Lead Times</a></li>
          <li><a @click="selectLeadTime('Under 2 Months')">Under 2 Months</a></li>
          <li><a @click="selectLeadTime('2-3 Months')">2-3 Months</a></li>
          <li><a @click="selectLeadTime('4-6 Months')">4-6 Months</a></li>
          <li><a @click="selectLeadTime('Over 6 Months')">Over 6 Months</a></li>
        </ul>
        </div>
    </div>




    <div
      class="carousel carousel-center w-full px-4 py-2 space-x-2 rounded-box -mt-2"
    >
      <div
        class="carousel-item px-2"
        v-for="site in filteredSites"
        :key="site.id"
      >
        <LeadTimeItem :item="site" />
      </div>
    </div>
  </div>

  <!-- Postcard Tracker Table -->
  <div>
    <PostcardTable />
  </div>
</template>

<script setup>
import ViewHeader from "@/components/headers/ViewHeader.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import LeadTimeItem from "@/components/postcard/LeadTimeItem.vue";
import PostcardTable from "@/components/postcard/PostcardTable.vue";
import CommunityStats from "@/components/CommunityStats.vue";
import { usePostcardStore } from "@/stores/postcard";
import { useUserStore } from "@/stores/user";
import { defineProps, onMounted, ref, computed } from "vue";
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  ClockIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  title: String,
});
const postcardStore = usePostcardStore();
const userStore = useUserStore();

onMounted(() => {
  postcardStore.fetchBatches();
});

const selectedSort = ref('Recommended');
const selectSort = (sort) => {
  selectedSort.value = sort;
};

const selectedValue = ref('All Values');
const selectValue = (value) => {
  selectedValue.value = value;
};

const selectedLeadTime = ref('All Lead Times');
const selectLeadTime = (leadTime) => {
  selectedLeadTime.value = leadTime;
};

const sites = computed(() => {
  return userStore.getPostcardSites;
});

const filteredSites = computed(() => {
  return sites.value;
});

</script>
