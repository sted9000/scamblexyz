import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    configModal: false,
    streakModal: false,
    graphModal: false,
    leaderboardModal: false,
    shareModal: false,
    createPostModal: false,
    editProfileModal: false,
  }),
  getters: {
    getConfigModal: (state) => {
      return state.configModal;
    },
    getStreakModal: (state) => {
      return state.streakModal;
    },
    getGraphModal: (state) => {
      return state.graphModal;
    },
    getLeaderboardModal: (state) => {
      return state.leaderboardModal;
    },
    getShareModal: (state) => {
      return state.shareModal;
    },
    getCreatePostModal: (state) => {
      return state.createPostModal;
    },
    getEditProfileModal: (state) => {
      return state.editProfileModal;
    },
    getModalOpen: (state) => {
      return (
        state.configModal ||
        state.streakModal ||
        state.graphModal ||
        state.leaderboardModal ||
        state.shareModal ||
        state.createPostModal ||
        state.editProfileModal
      );
    },
  },
  actions: {
    setCloseAllModals() {
      this.configModal = false;
      this.streakModal = false;
      this.graphModal = false;
      this.leaderboardModal = false;
      this.shareModal = false;
      this.createPostModal = false;
      this.editProfileModal = false;
    },
    setOpenModal(modalName) {
      this.setCloseAllModals();
      switch (modalName) {
        case "config":
          this.configModal = true;
          break;
        case "streak":
          this.streakModal = true;
          break;
        case "graph":
          this.graphModal = true;
          break;
        case "leaderboard":
          this.leaderboardModal = true;
          break;
        case "share":
          this.shareModal = true;
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
