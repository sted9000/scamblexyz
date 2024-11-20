import { defineStore } from "pinia";
import api from "@/api";
import { flattenSite } from "@/utils";

export const useBonusStore = defineStore("bonus", {
  state: () => ({
    bonus: [],
  }),
  getters: {
    getBonuses: (state) => state.bonus.map((bonus) => (
      flattenSite(bonus)
    )),
  },
  actions: {
    async fetchUserBonus() {
      try {
        const response = await api.get("/bonus");
        this.bonus = response.data;
      } catch (error) {
        console.error("Error fetching user bonus:", error);
      }
    },
    async addBonus(bonus) {
      try {
        const response = await api.post("/bonus", bonus);
        this.bonus.push(flattenSite(response.data));
      } catch (error) {
        console.error("Error adding bonus:", error);
      }
    },
    async updateBonus(id, bonus) {
      try {
        const response = await api.put(`/bonus/${id}`, bonus);
        const index = this.bonus.findIndex((b) => b.id === id);
        this.bonus[index] = flattenSite(response.data);
      } catch (error) {
        console.error("Error updating bonus:", error);
      }
    },
    async deleteBonus(id) {
      try {
        await api.delete(`/bonus/${id}`);
        this.bonus = this.bonus.filter((b) => b.id !== id);
      } catch (error) {
        console.error("Error deleting bonus:", error);
      }
    },
  },
});
