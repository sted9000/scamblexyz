import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    configModal: false,
    graphModal: false,
    leaderboardModal: false,
    cardModal: false,
    updateCardModal: false,
    helpModal: false,
    createPostModal: false,
    editProfileModal: false,

    // modal data
    modalData: {},
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
    getCardModal: (state) => {
      return state.cardModal;
    },
    getUpdateCardModal: (state) => {
      return state.updateCardModal;
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
    getModalOpen: (state) => {
      return (
        state.configModal ||
        state.graphModal ||
        state.leaderboardModal ||
        state.cardModal ||
        state.updateCardModal ||
        state.helpModal ||
        state.createPostModal ||
        state.editProfileModal
      );
    },
  },
  actions: {
    setCloseAllModals() {
      this.configModal = false;
      this.graphModal = false;
      this.leaderboardModal = false;
      this.cardModal = false;
      this.updateCardModal = false;
      this.helpModal = false;
      this.createPostModal = false;
      this.editProfileModal = false;
      this.modalData = {};
    },
    setOpenModal(modalName, data) {
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
        case "card":
          this.cardModal = true;
          break;
        case "updateCard":
          this.updateCardModal = true;
          this.modalData = data;
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
        default:
          console.error("Invalid modal name:", modalName);
      }
    },
  },
});
