import { defineStore } from "pinia";
import api from "@/api";
import { setMedianLeadTimes } from "@/utils";

export const usePostcardStore = defineStore("postcard", {
  state: () => ({
    drop: [], // Global drops
    batch: [], // User batches
    medianLeadTimes: {},
    batchId: null, // Current batch ID
  }),
  getters: {
    getDrops: (state) => {
      return state.drop;
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
    async fetchDrops() {
      try {
        const response = await api.get("/postcard/drop");
        this.drop = response.data;
        this.medianLeadTimes = setMedianLeadTimes(this.drop);
      } catch (error) {
        console.error("Error fetching drops:", error);
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
