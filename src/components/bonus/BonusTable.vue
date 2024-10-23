<script setup>
import { computed } from "vue";
import { sites as localSites } from "@/constants";
import { useBonusStore } from "@/stores/bonus";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import { CreditCardIcon, TrashIcon } from "@heroicons/vue/24/outline";
const bonusStore = useBonusStore();
const userBonuses = computed(() => bonusStore.getUserBonus);
const siteImage = (siteId) => {
  return localSites[siteId].imagePath;
};
const siteName = (siteId) => {
  return localSites[siteId].fullName;
};
const formatBonusType = (type) => {
  switch (type) {
    case 'deposit':
      return 'Deposit Bonus';
    case 'happyhour':
      return 'Happy Hour Bonus';
    case 'signup':
      return 'Signup Bonus';
    default:
      return type;
  }
};
const deleteBonus = (id) => {
  bonusStore.deleteBonus(id);
};
</script>

<template>
  <SectionHeader title="My Bonus History" :icon="CreditCardIcon" />
  <div class="h-[440px] mx-4">
    <table class="table table custom-zebra table-no-dividers">
      <thead>
        <tr>
          <th>Site</th>
          <th>Amount</th>
          <th>Bonus Amount</th>
          <th>Type</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bonus in userBonuses" :key="bonus.siteId">
          <td>
            <div class="flex space-x-3 items-center">
              <div class="avatar">
                <div class="mask mask-squircle w-4 h-4">
                  <img :src="siteImage(bonus.Bonus.siteId)" :alt="siteName(bonus.Bonus.siteId)" />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ siteName(bonus.Bonus.siteId) }}</div>
              </div>
            </div>
          </td>
          <td>${{ bonus.Bonus.amount }}</td>
          <td>${{ bonus.Bonus.bonusAmount }}</td>
          <td>{{ formatBonusType(bonus.Bonus.bonusType) }}</td>
          <td>{{ new Date(bonus.Bonus.createdAt).toLocaleDateString() }}</td>
          <!-- Delete button (trash icon)-->
          <td>
            <TrashIcon @click="deleteBonus(bonus.id)" class="h-4 w-4 text-gray-500" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.custom-zebra tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.03); /* Very light gray, almost white */
}

.custom-zebra tr:nth-child(odd) {
  background-color: white;
}

.table-no-dividers tbody tr,
.table-no-dividers thead tr {
  border: none;
}
</style>
```
