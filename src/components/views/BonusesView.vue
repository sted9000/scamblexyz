<template>
  <ViewHeader :title="props.title" />
  <div class="mb-8">
    <SectionHeader title="Stats" />
    <div class="carousel carousel-center w-full">
      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Total Claimed</div>
            <div className="stat-value flex items-center text-secondary">
              <CurrencyDollarIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">$2342</div>
            </div>
            <div class="stat-desc">$531 this week</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Bonus Points</div>
            <div className="stat-value flex items-center text-secondary">
              <ArrowUpIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">2342</div>
            </div>
            <div class="stat-desc">Earned 234 yesterday</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat">
            <div className="stat-title text-gray-700">Community Rank</div>
            <div className="stat-value flex items-center text-secondary">
              <UserGroupIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">6th</div>
            </div>
            <div class="stat-desc">15 points behind 5th</div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat text-secondary">
            <div className="stat-title text-gray-700">Bonuses Found</div>
            <div className="stat-value flex items-center">
              <NewspaperIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">10</div>
            </div>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="carousel-item stats ml-4 bg-gray-100 text-gray-700">
          <div className="stat text-secondary">
            <div className="stat-title text-gray-700">Bonues Confirmed</div>
            <div className="stat-value text-secondard flex items-center">
              <ArrowUpOnSquareIcon class="h-8 w-8 mr-2" />
              <div class="stat-value">62</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Community Leads Section -->
  <BonusSection />

  <!-- Users' Bonuses Section -->
  <BonusTable />
</template>

<script setup>
import ViewHeader from "@/components/headers/ViewHeader.vue";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import BonusSection from "@/components/bonus/BonusSection.vue";
import BonusTable from "@/components/bonus/BonusTable.vue";
import { useBonusStore } from "@/stores/bonus";
const bonusStore = useBonusStore();
import { defineProps, onMounted } from "vue";
import {
  ArrowUpIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  NewspaperIcon,
  ArrowUpOnSquareIcon,
} from "@heroicons/vue/24/outline";
const props = defineProps({
  title: String,
});

onMounted(() => {
  console.log("fetching bonus data");
  bonusStore.fetchUserBonus();
});
</script>
```
