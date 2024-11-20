<template>
              <div className="stat">
            <div className="stat-title text-gray-700">{{props.category}} Points</div>
            <div className="stat-value text-secondard flex items-center">
              <ArrowUpIcon :class="textColor" class="h-8 w-8 mr-2" />
              <div :class="textColor" class="stat-value">{{ pointsObject.points }}</div>
            </div>
            <div class="stat-desc">{{pointsObject.today}} Points Earned Today</div>
          </div>
          <div className="stat">
            <div className="stat-title text-gray-700">Community Rank</div>
            <div className="stat-value text-secondard flex items-center">
              <UserGroupIcon :class="textColor" class="h-8 w-8 mr-2" />
        <div :class="textColor" class="stat-value">{{ communityRankFormatting(pointsObject.rank) }}</div>
      </div>
      <div class="stat-desc">{{ pointsObject.behind }} points behind {{ communityRankFormatting(pointsObject.rank - 1) }}</div>
    </div>
</template>

<script setup>
import { useRealtimeStore } from "@/stores/realtime";
import { computed, defineProps } from "vue";
import { UserGroupIcon, ArrowUpIcon } from "@heroicons/vue/24/outline";
import { communityRankFormatting } from "@/utils";
const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});
const textColor = computed(() => {
  // switch statement for the category
  switch (props.category) {
    case 'Checkin':
      return 'text-primary';
    case 'Bonus':
      return 'text-secondary';
    case 'Postcard':
      return 'text-accent';
    default:
      return 'text-primary';
  }
});

const realtimeStore = useRealtimeStore();
console.log("props.category", props.category);

const pointsObject = computed(() => realtimeStore.getPointsBehindObject(props.category));
</script>