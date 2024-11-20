<template>
  <div
    class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
    >
    <div class="flex justify-end items-center mb-4">
    <button @click="editBatch" class="btn btn-sm ml-2 bg-blue-500 text-white">
          Edit Batch
        </button>
        <button @click="addDrop" class="btn btn-sm ml-2 bg-green-500 text-white">Add Drop</button>
        <button @click="addRejection" class="btn btn-sm ml-2 bg-red-500 text-white">Add Rejection</button>
      
        </div>
        <h2 class="text-2xl font-bold">Batch Details</h2>
      
      
        <div class="text-md text-gray-700 mt-1">Site: {{ batch.fullName }}</div>
        <div class="text-md text-gray-700 mt-1">Batch Id: {{ batch.id }}</div>
        <div class="text-md text-gray-700 mt-1">Date Sent: {{ new Date(batch.submissionDate).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }) }}</div> 
      <div class="text-md text-gray-700 mt-1">Status: {{ batchStatus(batch) }}</div>
      <div class="text-md text-gray-700 mt-1">Batch Size: {{ batch.totalCards }}</div>
      <div class="text-md text-gray-700 mt-1">Credited: {{ batch.creditedCards }}</div>
      <div class="text-md text-gray-700 mt-1">Pending: {{ batch.pendingCards }}</div>
      <div class="text-md text-gray-700 mt-1">Rejected: {{ batch.rejectedCards }}</div>

 
      <div class="mb-4">
        <table class="table">
          <thead class="text-center">
            <tr>
              <th class="text-lg" colspan="4">Drop History</th>
            </tr>
            <tr>
              <th>Cards</th>
              <th>Date</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-if="batch.Drops.length === 0">
              <td colspan="4">No drops found</td>
            </tr>
            <tr v-else v-for="drop in batch.Drops" :key="drop.id">
              <td>{{ drop.cardsProcessed }}</td>
              <td>
                {{
                  new Date(drop.dropDate).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  })
                }}
              </td>
              <td :class="{ 'text-gray-700': drop.dropType === 'drop', 'text-red-500': drop.dropType === 'rejection' }" class="text-center">
                {{ drop.dropType.charAt(0).toUpperCase() + drop.dropType.slice(1) }}
              </td>
              <td>
                <button @click="deleteDrop(drop.id)" class="btn btn-xs">
                  <TrashIcon class="w-3 h-3" />
                </button>
              </td>
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
import { usePostcardStore } from "@/stores/postcard";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { batchStatus } from "@/utils";

const modalStore = useModalStore();
const postcardStore = usePostcardStore();
const batch = computed(() => postcardStore.getBatch);

const editBatch = () => {
  modalStore.setOpenModal("updateBatch");
};

const addDrop = () => {
  modalStore.setOpenModal("addDrop");
};

const addRejection = () => {
  modalStore.setOpenModal("addRejection");
};

const deleteDrop = (dropId) => {
  postcardStore.deleteDrop(dropId);
};



const closeModal = () => {
  modalStore.setCloseAllModals();
};
</script>
