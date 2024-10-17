import { defineStore } from "pinia";
import { sites } from "@/constants";
import api from "@/api";
import { io } from "socket.io-client";

export const useBonusStore = defineStore("bonus", {
  state: () => ({
    communityBonus: [],
    userBonus: [],
  }),
  getters: {
    getCommunityBonus: (state) => {
      // Community bonuses that were added today
      return state.communityBonus
        .map((bonus) => ({
          ...bonus,
          ...sites[bonus.siteId],
          id: bonus.id,
        }));
    },
    getUserBonus: (state) =>
      state.userBonus.map((bonus) => ({
        ...bonus,
        ...sites[bonus.siteId],
      })),
      getCountOfBonuses: (state) => state.communityBonus.length,
      getCountOfBonusesPostedToday: (state) => state.communityBonus.filter((bonus) => new Date(bonus.createdAt).toDateString() === new Date().toDateString()).length,
      getNumberOfConfirmedBonuses: (state) => state.communityBonus.filter((bonus) => bonus.confirmedCount > 0).length,  
      getBonusesAmount: (state) => {
        const bonusAmount = state.communityBonus.reduce((total, bonus) => total + bonus.bonusAmount, 0);
        const purchaseAmount = state.communityBonus.reduce((total, bonus) => total + bonus.amount, 0);
        return bonusAmount - purchaseAmount;
      },
      getConfirmedBonusesUserCount: (state) => state.communityBonus.filter((bonus) => bonus.confirmedCount > 0).reduce((total, bonus) => total + bonus.confirmedCount, 0),
      getBonusesClaimed: (state) => state.userBonus.length,
      getBonusesClaimedThisWeek: (state) => state.userBonus.filter((bonus) => new Date(bonus.createdAt) > new Date(new Date().setDate(new Date().getDate() - 7))).length,
      getBonusesClaimedAmount: (state) => {
        const bonusesClaimed = state.userBonus.reduce((total, bonus) => total + bonus.Bonus.bonusAmount, 0);
        const purchaseAmount = state.userBonus.reduce((total, bonus) => total + bonus.Bonus.amount, 0);
        return bonusesClaimed - purchaseAmount;
      },
      getBonusesClaimedAmountThisWeek: (state) => {
        const bonusesClaimed = state.userBonus.filter((bonus) => new Date(bonus.createdAt) > new Date(new Date().setDate(new Date().getDate() - 7))).reduce((total, bonus) => total + bonus.Bonus.bonusAmount, 0);
        const purchaseAmount = state.userBonus.filter((bonus) => new Date(bonus.createdAt) > new Date(new Date().setDate(new Date().getDate() - 7))).reduce((total, bonus) => total + bonus.Bonus.amount, 0);
        return bonusesClaimed - purchaseAmount;
      }
  },
  actions: {
    async fetchUserBonus() {
      try {
        const response = await api.get("/bonus/user");
        this.userBonus = response.data;
      } catch (error) {
        console.error("Error fetching user bonus:", error);
      }
    },
    async addBonus(bonus) {
      try {
        const response = await api.post("/bonus", bonus);
        console.log("response", response);
        // add the new bonus to the userBonus array
        this.userBonus.push(response.data);
      } catch (error) {
        console.error("Error adding bonus:", error);
      }
    },
    async updateBonus(id, {isConfirmed}) {
      try {
        const response = await api.put(`/bonus/${id}`, {isConfirmed});
        if (response.status === 200 && response.data.message === "Bonus event already exists") {
          console.log("Bonus event already exists");
        } else {
          // update the bonus in the userBonus array
          const index = this.userBonus.findIndex((b) => b.id === id);
          this.userBonus[index] = response.data;
        }
      } catch (error) {
        console.error("Error updating bonus:", error);
      }
    },

    initializeSocket() {
      this.socket = io("http://localhost:3000", {
        transports: ["websocket", "polling"],
      });

      this.socket.on("connect", () => {
        this.isConnected = true;
        console.log("Connected to bonus server");
      });

      this.socket.on("disconnect", () => {
        this.isConnected = false;
        console.log("Disconnected from server");
      });

      this.socket.on("bonus_update", (data) => {
        console.log("bonus_update", data);
        this.updateBonuses(data);
      });
    },

    updateBonuses(data) {
      this.communityBonus = data;
    },

    requestDropUpdate() {
      if (this.isConnected) {
        this.socket.emit("request_bonus_update");
      }
    },
  },
});
