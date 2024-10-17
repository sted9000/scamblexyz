// src/stores/leaderboardStore.js
import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => ({
    /*** Leaderboards ***/
    OVERALL_ALLTIME: [],
    OVERALL_WEEKLY: [],
    OVERALL_YESTERDAY: [],
    OVERALL_TODAY: [],
    CHECKIN_ALLTIME: [],
    CHECKIN_WEEKLY: [],
    CHECKIN_YESTERDAY: [],
    CHECKIN_TODAY: [],
    BONUS_ALLTIME: [],
    BONUS_WEEKLY: [],
    BONUS_YESTERDAY: [],
    BONUS_TODAY: [],
    POSTCARD_ALLTIME: [],
    POSTCARD_WEEKLY: [],
    POSTCARD_YESTERDAY: [],
    POSTCARD_TODAY: [],

    /*** User ***/
    userOverallScore: 0,
    userCheckinScore: 0,
    userBonusScore: 0,
    userPostcardScore: 0,
    userOverallRank: 0,
    userCheckinRank: 0,
    userBonusRank: 0,
    userPostcardRank: 0,

    /*** Community ***/  
    todaysCheckins: 0,
    yesterdaysCheckins: 0,

    /*** Connection ***/
    isConnected: false,

  }),
  getters: {
    overallAllTime: (state) => state.OVERALL_ALLTIME,
    overallWeekly: (state) => state.OVERALL_WEEKLY,
    overallYesterday: (state) => state.OVERALL_YESTERDAY,
    overallToday: (state) => state.OVERALL_TODAY,
    checkinAllTime: (state) => state.CHECKIN_ALLTIME,
    checkinWeekly: (state) => state.CHECKIN_WEEKLY,
    checkinYesterday: (state) => state.CHECKIN_YESTERDAY,
    checkinToday: (state) => state.CHECKIN_TODAY,
    bonusAllTime: (state) => state.BONUS_ALLTIME,
    bonusWeekly: (state) => state.BONUS_WEEKLY,
    bonusYesterday: (state) => state.BONUS_YESTERDAY,
    bonusToday: (state) => state.BONUS_TODAY,
    postcardAllTime: (state) => state.POSTCARD_ALLTIME,
    postcardWeekly: (state) => state.POSTCARD_WEEKLY,
    postcardYesterday: (state) => state.POSTCARD_YESTERDAY,
    postcardToday: (state) => state.POSTCARD_TODAY,

    // get user rank
    getUserRank: (state) => {
      return state.userOverallRank;
    },

    // get user score
    getUserScore: (state) => {
      return state.userOverallScore;
    },

    // get user points behind
    // getUserPointsBehind: (state) => {
    //   const otherScore = state.OVERALL_ALLTIME[state.userRank].score || 0; 
    //   return otherScore - state.userScore;
    // },

    // get todays checkins
    getTodaysCheckins: (state) => {
      return state.todaysCheckins;
    },

    // get yesterdays checkins
    getYesterdaysCheckins: (state) => {
      return state.yesterdaysCheckins;
    },

    // get yesterdays leaderboard winner
    getYesterdaysLeaderboardWinner: (state) => {
      return state.OVERALL_YESTERDAY.find((user) => user.rank === 1);
    },



  },
  actions: {
    initializeSocket() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId
      this.socket = io("http://localhost:3000", {
        transports: ["websocket", "polling"],
        query: { userId: userId },
      });

      this.socket.on("connect", () => {
        this.isConnected = true;
        console.log("Connected to server");
      });


      this.socket.on("disconnect", () => {
        this.isConnected = false;
        console.log("Disconnected from server");
      });

      this.socket.on("leaderboards_update", (data) => {
        console.log("Leaderboards updated", data);
        this.updateLeaderboards(data);
      });

      this.socket.on("user_leaderboard_update", (data) => {
        console.log("User leaderboard updated", data);
        this.updateUserLeaderboard(data);
      });

      this.socket.on("request_checkins", (data) => {
        console.log("Request checkins", data);
        this.updateCheckins(data);
      });

      this.socket.on("checkin-update", (data) => {
        console.log("Checkin update", data);
        this.updateCheckins(data);
      });
    },

    updateCheckins(data) {
      this.todaysCheckins = data.today;
      this.yesterdaysCheckins = data.yesterday;
    },

    updateUserLeaderboard(data) {
      console.log("Updating user leaderboard", data);
      this.userOverallScore = data.userOverallScore;
      this.userOverallRank = data.userOverallRank;
      this.userCheckinScore = data.userCheckinScore;
      this.userCheckinRank = data.userCheckinRank;
      this.userBonusScore = data.userBonusScore;
      this.userBonusRank = data.userBonusRank;
      this.userPostcardScore = data.userPostcardScore;
      this.userPostcardRank = data.userPostcardRank;
    },

    updateLeaderboards(data) {
      this.OVERALL_ALLTIME = data.overall.all_time;
      this.OVERALL_WEEKLY = data.overall.weekly;
      this.OVERALL_YESTERDAY = data.overall.yesterday;
      this.OVERALL_TODAY = data.overall.today;
      this.CHECKIN_ALLTIME = data.checkin.all_time;
      this.CHECKIN_WEEKLY = data.checkin.weekly;
      this.CHECKIN_YESTERDAY = data.checkin.yesterday;
      this.CHECKIN_TODAY = data.checkin.today;
      this.BONUS_ALLTIME = data.bonus.all_time;
      this.BONUS_WEEKLY = data.bonus.weekly;
      this.BONUS_YESTERDAY = data.bonus.yesterday;
      this.BONUS_TODAY = data.bonus.today;
      this.POSTCARD_ALLTIME = data.postcard.all_time;
      this.POSTCARD_WEEKLY = data.postcard.weekly;
      this.POSTCARD_YESTERDAY = data.postcard.yesterday;
      this.POSTCARD_TODAY = data.postcard.today;
    },

    requestLeaderboardUpdate() {
      if (this.isConnected) {
        this.socket.emit("request_leaderboard_update");
      }
    },

  },
});
