<script setup>
import { computed } from "vue";
import { usePostcardStore } from "@/stores/postcard";
import { useModalStore } from "@/stores/modal";
import { sites as localSites } from "@/constants";
import SectionHeader from "@/components/headers/SectionHeader.vue";
import {
  CreditCardIcon,
  ArrowDownIcon,
  // PencilIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/vue/24/outline";

const postcardStore = usePostcardStore();
const modalStore = useModalStore();
const batches = computed(() => postcardStore.getUserBatches);
const batchSiteLogo = (siteId) => localSites[siteId].imagePath;
const batchSiteName = (siteId) => localSites[siteId].fullName;
const batchStatus = (batch) => {
  // If batch.pendingCards is 0, then all cards have been sent and status is complete
  if (batch.pendingCards === 0) {
    return "Complete";
  } else {
    return "Pending";
  }
};
const handleAddDrop = (batchId) => {
  postcardStore.setBatchId(batchId);
  modalStore.setOpenModal("addDrop");
};
// const handleEditBatch = (batchId) => {
//   postcardStore.setBatchId(batchId);
//   modalStore.setOpenModal("editBatch");
// };
const handleBatchModal = (batchId) => {
  postcardStore.setBatchId(batchId);
  modalStore.setOpenModal("batch");
};
</script>

<template>
  <SectionHeader title="Postcard History" :icon="CreditCardIcon" />
  <div class="flex justify-center mb-8">
    <table class="table table-sm custom-zebra table-no-dividers">
      <thead class="text-center">
        <tr>
          <th>Site</th>
          <th>Batch Size</th>
          <th>Date Sent</th>
          <th>Status</th>
          <th>{{ " " }}</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="batch in batches" :key="batch.id">
          <td>
            <div class="flex items-center justify-center space-x-3">
              <div class="avatar">
                <div class="mask mask-squircle w-4 h-4">
                  <img
                    :src="batchSiteLogo(batch.siteId)"
                    :alt="batchSiteName(batch.siteId)"
                  />
                </div>
              </div>
              <div>
                <div class="font-bold">{{ batchSiteName(batch.siteId) }}</div>
              </div>
            </div>
          </td>
          <td>{{ batch.totalCards }}</td>
          <td>{{ new Date(batch.submissionDate).toLocaleDateString() }}</td>
          <td>{{ batchStatus(batch) }}</td>
          <td>
            <div class="flex space-x-1">
              <button class="btn btn-sm" @click="handleAddDrop(batch.id)">
                <ArrowDownIcon class="w-3 h-3" />
              </button>
              <!-- <button class="btn btn-sm" @click="handleEditBatch(batch.id)">
                <PencilIcon class="w-3 h-3" />
              </button> -->
              <button class="btn btn-sm" @click="handleBatchModal(batch.id)">
                <EllipsisHorizontalIcon class="w-3 h-3" />
              </button>
            </div>
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
