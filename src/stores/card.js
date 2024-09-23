import { defineStore } from "pinia";
import { authenticatedApiCall, handleError } from "../apiService";

const setMedianLeadTimes = (drops) => {
  const leadTimesBySite = {};

  // Calculate lead times for each drop and group by SiteId
  drops.forEach((drop) => {
    const leadTime = drop.DropDate - drop.SentDate;
    if (!leadTimesBySite[drop.SiteId]) {
      leadTimesBySite[drop.SiteId] = [];
    }
    leadTimesBySite[drop.SiteId].push(leadTime);
  });

  // Calculate median lead time for each site
  const medianLeadTimes = {};
  for (const [siteId, leadTimes] of Object.entries(leadTimesBySite)) {
    leadTimes.sort((a, b) => a - b);
    const mid = Math.floor(leadTimes.length / 2);
    const median =
      leadTimes.length % 2 === 0
        ? (leadTimes[mid - 1] + leadTimes[mid]) / 2
        : leadTimes[mid];
    medianLeadTimes[siteId] = median;
  }

  return medianLeadTimes;
};

export const useCardStore = defineStore("card", {
  state: () => ({
    drop: [], // Global drops
    batch: [], // User batches
    medianLeadTimes: {},
    card: [],
    userCard: [],
    initialCardLoad: true,
  }),
  getters: {
    getCards: (state) => {
      return state.card ?? [];
    },
    getDrops: (state) => {
      return state.drop ?? [];
    },
    getUserBatches: (state) => {
      return state.batch ?? [];
    },
    getMedianLeadTimes: (state) => {
      return state.medianLeadTimes ?? {};
    },
    getCardLoading: (state) => {
      return state.initialCardLoad;
    },
  },
  actions: {
    async fetchBatches() {
      try {
        const response = await authenticatedApiCall("GET", "/postcard/batch");
        this.batch = response.data;
        this.initialLoad = false;
      } catch (error) {
        handleError(error);
      }
    },
    async addBatch(batchData) {
      try {
        const response = await authenticatedApiCall(
          "POST",
          "/postcard/batch",
          batchData
        );
        // Add to the local store, it should be the first element
        this.batch.unshift(response.data);
      } catch (error) {
        handleError(error);
      }
    },
    async fetchDrops() {
      try {
        const response = await authenticatedApiCall("GET", "/postcard/drop");
        this.drop = response.data;
        this.medianLeadTimes = setMedianLeadTimes(this.drop);

        this.initialLoad = false;
      } catch (error) {
        handleError(error);
      }
    },
    async addDrop(dropData) {
      try {
        const response = await authenticatedApiCall(
          "POST",
          "/postcard/drop",
          dropData
        );
        this.drop.unshift(response.data.drop);
        this.medianLeadTimes = setMedianLeadTimes(this.drop);
        // replace the batch item with the BatchId ===  dropData.BatchId)
        const batchIndex = this.batch.findIndex(
          (batch) => batch.BatchId === dropData.BatchId
        );
        this.batch[batchIndex] = response.data.batch;
      } catch (error) {
        handleError(error);
      }
    },
  },
});
