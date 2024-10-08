<template>
  <div
    class="px-6 py-4 bg-gray-100 rounded-xl flex flex-col h-full cursor-pointer relative group min-h-[220px] min-w-[180px]"
  >
    <div class="flex justify-between mb-2">
      <img
        :src="bonusItem.imagePath"
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
        {{ bonusItem.fullName }}
      </div>
      <p class="font-bold text-2xl text-gray-700">
        {{ bonusAmount }} for {{ amount }}
      </p>
      <p class="font-bold text-lg text-gray-700">{{ bonusType }}</p>

      <p class="text-xs text-gray-500">
        {{
          new Date(props.item.datetime).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </p>
    </div>
    <div class="flex justify-between mt-4">
      <div
        :class="[
          'text-xs mr-2',
          props.item.confirmedCount > 0 ? 'text-green-500' : 'text-gray-500',
        ]"
      >
        {{
          props.item.confirmedCount > 0
            ? props.item.confirmedCount + "x Confirmed"
            : "Unconfirmed"
        }}
      </div>
      <div v-if="props.item.disputedCount > 0"
        class="text-xs mr-2 text-red-500"
      >
        {{ props.item.disputedCount }}x Disputed
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
        @click="confirmBonus"
        class="px-3 py-1 bg-green-500 text-white rounded my-1 hover:bg-green-600 transition-colors"
      >
        Confirm
      </button>
      <button
        @click="showDetails"
        class="px-3 py-1 bg-gray-500 text-white rounded my-1 hover:bg-gray-600 transition-colors"
      >
        Dispute
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { CurrencyDollarIcon } from "@heroicons/vue/20/solid";
import { useBonusStore } from "@/stores/bonus";
import { sites as localSites } from "@/constants";
// import { useModalStore } from "@/stores/modal";

const bonusStore = useBonusStore();
// const modalStore = useModalStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const bonusItem = computed(() => {
  return { ...props.item, ...localSites[props.item.siteId] };
});

const amount = Math.round(bonusItem.value.amount).toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const bonusAmount = Math.round(bonusItem.value.bonusAmount).toLocaleString(
  "en-US",
  {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }
);

const bonusType = computed(() => {
  if (bonusItem.value.bonusType === "deposit") return "Deposit Bonus";
  if (bonusItem.value.bonusType === "signup") return "Signup Bonus";
  if (bonusItem.value.bonusType === "happyhour") return "Happy Hour Bonus";
  if (bonusItem.value.bonusType === "other") return "Other Bonus";
  return "Unknown Bonus";
});

const currencyIconCount = computed(() => {
  if (bonusItem.value.bonusAmount > 50) return 3;
  if (bonusItem.value.bonusAmount > 20) return 2;
  return 1;
});

// Methods for button actions
const launchBonus = () => {
  window.open(bonusItem.value.url, "_blank");
};

const confirmBonus = () => {
  bonusStore.updateBonus(bonusItem.value.id);
};

// const showDetails = () => {
//   modalStore.openModal("BonusDetails", { bonus: props.item });
// };
</script>
