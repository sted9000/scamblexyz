import { defineStore } from "pinia";
export const useUiStore = defineStore("ui", {
  state: () => ({
    view: "Home",
  }),

  getters: {
    getView: (state) => state.view,
  },

  actions: {
    setView(view) {
      this.view = view;
    },
  },
});
