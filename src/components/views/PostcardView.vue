<template>
  <ViewHeader :title="props.title" />

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
          <div className="stat">
            <div className="stat-title text-gray-700">Postcard Points</div>
            <div className="stat-value text-secondard flex items-center">
              <ArrowUpIcon class="h-8 w-8 mr-2 text-accent" />
              <div class="stat-value text-accent">1350</div>
            </div>
            <div className="stat-desc">24 Points Earned Today</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Community Rank</div>
            <div className="stat-value text-secondard flex items-center">
              <UserGroupIcon class="h-8 w-8 mr-2 text-accent" />
              <div class="stat-value text-accent">2nd</div>
            </div>
            <div className="stat-desc">35 Points Behind 1st Place</div>
          </div>
        </div>
      </div>

      
    </div>
  </div>

  <!-- Drops Section
  <LatestDropCarouselSection /> -->

  <!-- Lead Times Section -->
  <SectionHeader title="Site Info" />
  <div class="mt-4 mb-8">
    <div
      class="carousel carousel-center w-full px-4 py-2 space-x-2 rounded-box -mt-2"
    >
      <div
        class="carousel-item px-2"
        v-for="leadTime in leadTimes"
        :key="leadTime.id"
      >
        <LeadTimeItem :item="leadTime" />
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
import { usePostcardStore } from "@/stores/postcard";
import { defineProps, onMounted, ref } from "vue";
import {
  EnvelopeIcon,
  EnvelopeOpenIcon,
  ClockIcon,
  TrashIcon,
  ArrowUpIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  title: String,
});
const postcardStore = usePostcardStore();

const leadTimes = ref([
  { id: 1, leadTime: "7 days" },
  { id: 2, leadTime: "5 days" },
  { id: 3, leadTime: "6 days" },
]);

onMounted(() => {
  postcardStore.fetchBatches();
});
</script>
