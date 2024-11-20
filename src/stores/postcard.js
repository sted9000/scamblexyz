import { defineStore } from "pinia";
import api from "@/api";
import { flattenSites, flattenSite, rawPathToImagePath } from "@/utils";

export const usePostcardStore = defineStore("postcard", {
  state: () => ({
    batch: [], // User batches
    medianLeadTimes: {},
    batchId: null, // Current batch ID
    loadingPostcardSite: false,
    postcardSite: null
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
    getPostcardSite: (state) => {
      return state.postcardSite;
    },
    getLoadingPostcardSite: (state) => {
      return state.loadingPostcardSite;
    },
  },
  actions: {
    async fetchBatches() {
      try {
        const response = await api.get("/postcard/batch");
        this.batch = flattenSites(response.data);
      } catch (error) {
        console.error("Error fetching batches:", error);
      }
    },
    async addBatch(batchData) {
      try {
        const response = await api.post("/postcard/batch", batchData);
        this.batch.unshift(flattenSite(response.data));
      } catch (error) {
        console.error("Error adding batch:", error);
      }
    },
    async updateBatch(batchId, batchData) {
      try {
        const response = await api.put(`/postcard/batch/${batchId}`, batchData);
        console.log("response", response);
        const batchIndex = this.batch.findIndex(batch => batch.id === batchId);
        console.log("batchIndex", batchIndex);
        this.batch[batchIndex] = flattenSite(response.data);
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
        this.batch[batchIndex] = flattenSite(response.data);
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
    fetchPostcardSite(siteId) {
      this.loadingPostcardSite = true;
      api.get(`/postcard/site/${siteId}`).then((response) => {
        this.postcardSite = { ...response.data, imagePath: rawPathToImagePath(response.data.imagePath) }
        this.loadingPostcardSite = false;
      });
    },
  },
});
