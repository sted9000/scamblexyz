import { defineStore } from "pinia";
import api from "@/api";

export const usePostcardStore = defineStore("postcard", {
  state: () => ({
    batch: [], // User batches
    medianLeadTimes: {},
    batchId: null, // Current batch ID
  }),
  getters: {
    getTotalCards: (state) => {
      return state.batch.reduce((total, batch) => total + batch.totalCards, 0);
    },
    getTotalCreditedCards: (state) => {
      return state.batch.reduce((total, batch) => total + batch.creditedCards, 0);
    },
    getTotalRejectedCards: (state) => {
      return state.batch.reduce((total, batch) => total + batch.rejectedCards, 0);
    },
    getTotalPendingCards: (state) => {
      // total - credited - rejected
      return state.batch.reduce((total, batch) => total + batch.totalCards - batch.creditedCards - batch.rejectedCards, 0);
    },
    getUserBatches: (state) => {
      return state.batch;
    },
    getMedianLeadTimes: (state) => {
      return state.medianLeadTimes;
    },
    getBatch: (state) => {
      return state.batch.find((batch) => batch.id === state.batchId);
    },
  },
  actions: {
    async fetchBatches() {
      try {
        const response = await api.get("/postcard/batch");
        this.batch = response.data;
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    },
    async addBatch(batchData) {
      try {
        const response = await api.post("/postcard/batch", batchData);
        this.batch.unshift(response.data);
      } catch (error) {
        console.error("Error adding batch:", error);
      }
    },
    async updateBatch(batchId, batchData) {
      try {
        const response = await api.put(`/postcard/batch/${batchId}`, batchData);
        const batchIndex = this.batch.findIndex(batch => batch.id === batchId);
        this.batch[batchIndex] = response.data;
      } catch (error) {
        console.error("Error updating batch:", error);
      }
    },
    async addDrop({ drop, batchId }) {
      console.log("batchId", batchId);
      try {
        const response = await api.post(`/postcard/drop/${batchId}`, drop);
        // this.medianLeadTimes = setMedianLeadTimes(this.drop);s
        // replace the batch item with the updated one
        const batchIndex = this.batch.findIndex(
          (batch) => batch.id === response.data.id
        );
        this.batch[batchIndex] = response.data;
      } catch (error) {
        console.error("Error adding drop:", error);
      }
    },
    async deleteDrop(dropId) {
      try {
        const response = await api.delete(`/postcard/drop/${dropId}`);
        console.log("response", response);
        const batchIndex = this.batch.findIndex(
          (batch) => batch.id === response.data.id
        );
        this.batch[batchIndex] = response.data;
      } catch (error) {
        console.error("Error deleting drop:", error);
      }
    },
    setBatchId(batchId) {
      this.batchId = batchId;
    },
  },
});
