<template>
  <div
    class="px-6 py-4 bg-gray-100 rounded-xl flex flex-col h-full cursor-pointer relative group min-h-[220px] min-w-[180px]"
  >
    <div class="flex justify-between mb-2">
      <img
        :src="props.item.imagePath"
        alt="Item image"
        class="w-10 h-10 rounded-full mr-2"
      />

      <div class="flex">
        <CurrencyDollarIcon
          v-for="i in currencyIconCount"
          :key="i"
          class="h-5 w-5 text-yellow-500"
        />
      </div>
    </div>
    <div class="flex-grow">
      <div class="text-2xl font-bold text-gray-700">
        {{ props.item.fullName }}
      </div>
      <p class="font-bold text-2xl text-gray-700">
        {{ bonusAmount }} for {{ amount }}
      </p>
      <p class="font-bold text-lg text-gray-700">{{ bonusType }}</p>
      <div :class="['inline-flex items-center py-1 px-2 rounded-md', props.item.claimLimit === 'multi' ? 'bg-secondary' : 'bg-gray-500']">
        <p class="text-xs font-semibold text-white">{{ claimLimit }}</p>
      </div>
      


    </div>
    <div class="flex justify-between mt-4 text-gray-500">
      <p class="text-xs text-gray-500">
        {{ bonusDate }}
      </p>
      <div class="flex">
        <div
        class="text-xs font-bold mr-1"
      >
        {{
          props.item.claimedCount
        }}
      </div>
        <CheckCircleIcon class="h-4 w-4" />
      </div>
    
    </div>

    

    <!-- Hover buttons -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      <button
        @click="launchBonus"
        class="px-3 py-1 bg-blue-500 text-white rounded my-1 hover:bg-blue-600 transition-colors"
      >
        Launch
      </button>
      <button
        @click="recordBonus"
        class="px-3 py-1 bg-green-500 text-white rounded my-1 hover:bg-green-600 transition-colors"
      >
        Record
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { CurrencyDollarIcon, CheckCircleIcon} from "@heroicons/vue/20/solid";
import { useBonusStore } from "@/stores/bonus";


const bonusStore = useBonusStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const amount = Math.round(props.item.amount).toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const bonusAmount = Math.round(props.item.bonusAmount).toLocaleString(
  "en-US",
  {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }
);

const bonusType = computed(() => {
  if (props.item.bonusType === "deposit") return "Deposit Bonus";
  if (props.item.bonusType === "signup") return "Signup Bonus";
  if (props.item.bonusType === "happyhour") return "Happy Hour Bonus";
  if (props.item.bonusType === "other") return "Other Bonus";
  return "Unknown Bonus";
});

const bonusDate = computed(() => {
  return new Date(props.item.datetime).toLocaleString("en-US", {
    month: "short", day: "numeric", hour: "numeric", minute: "numeric"
  });
});

const claimLimit = computed(() => {
  if (props.item.claimLimit === 'multi') return "Multi-Claim";
  return `Single Claim`;
});

const currencyIconCount = computed(() => {
  if (props.item.bonusAmount > 50) return 3;
  if (props.item.bonusAmount > 20) return 2;
  return 1;
});

// Methods for button actions
const launchBonus = () => {
  window.open(props.item.url, "_blank");
};

const recordBonus = () => {
  console.log("Confirming bonus", props.item.id);
  bonusStore.addBonus(props.item);
};


</script>
