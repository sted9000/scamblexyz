import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    configModal: false,
    graphModal: false,
    leaderboardModal: false,
    newBatchModal: false,
    addDropModal: false,
    updateBatchModal: false,
    batchModal: false,
    helpModal: false,
    createPostModal: false,
    editProfileModal: false,
    newBonusModal: false,
    rejectionModal: false,
  }),
  getters: {
    getConfigModal: (state) => {
      return state.configModal;
    },
    getGraphModal: (state) => {
      return state.graphModal;
    },
    getLeaderboardModal: (state) => {
      return state.leaderboardModal;
    },
    getNewBatchModal: (state) => {
      return state.newBatchModal;
    },
    getAddDropModal: (state) => {
      return state.addDropModal;
    },
    getUpdateBatchModal: (state) => {
      return state.updateBatchModal;
    },
    getRejectionModal: (state) => {
      return state.rejectionModal;
    },
    getBatchModal: (state) => {
      return state.batchModal;
    },
    getHelpModal: (state) => {
      return state.helpModal;
    },
    getCreatePostModal: (state) => {
      return state.createPostModal;
    },
    getEditProfileModal: (state) => {
      return state.editProfileModal;
    },
    getModalData: (state) => {
      return state.modalData;
    },
    getNewBonusModal: (state) => {
      return state.newBonusModal;
    },
    getModalOpen: (state) => {
      return (
        state.configModal ||
        state.graphModal ||
        state.leaderboardModal ||
        state.newBatchModal ||
        state.addDropModal ||
        state.updateBatchModal ||
        state.batchModal ||
        state.helpModal ||
        state.createPostModal ||
        state.editProfileModal ||
        state.newBonusModal ||
        state.rejectionModal
      );
    },
  },
  actions: {
    setCloseAllModals() {
      this.configModal = false;
      this.graphModal = false;
      this.leaderboardModal = false;
      this.newBatchModal = false;
      this.addDropModal = false;
      this.updateBatchModal = false;
      this.batchModal = false;
      this.helpModal = false;
      this.createPostModal = false;
      this.editProfileModal = false;
      this.newBonusModal = false;
      this.rejectionModal = false;
      this.modalData = {};
    },
    setOpenModal(modalName) {
      this.setCloseAllModals();
      switch (modalName) {
        case "config":
          this.configModal = true;
          break;
        case "graph":
          this.graphModal = true;
          break;
        case "leaderboard":
          this.leaderboardModal = true;
          break;
        case "newBatch":
          this.newBatchModal = true;
          break;
        case "addDrop":
          this.addDropModal = true;
          break;
        case "updateBatch":
          this.updateBatchModal = true;
          break;
        case "batch":
          this.batchModal = true;
          break;
        case "help":
          this.helpModal = true;
          break;
        case "createPost":
          this.createPostModal = true;
          break;
        case "editProfile":
          this.editProfileModal = true;
          break;
        case "newBonus":
          this.newBonusModal = true;
          break;
        case "addRejection":
          this.rejectionModal = true;
          break;
        default:
          console.error("Invalid modal name:", modalName);
      }
    },
  },
});
