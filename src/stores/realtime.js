// src/stores/leaderboardStore.js
import { flattenSite } from "@/utils";
import { defineStore } from "pinia";
import { io } from "socket.io-client";
const API_URL = process.env.VUE_APP_API_URL

export const useRealtimeStore = defineStore("realtime", {
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
    // AllTime
    userOverallScore: 0,
    userCheckinScore: 0,
    userBonusScore: 0,
    userPostcardScore: 0,
    userOverallRank: 0,
    userCheckinRank: 0,
    userBonusRank: 0,
    userPostcardRank: 0,

    // Today
    userOverallTodayScore: 0,
    userCheckinTodayScore: 0,
    userBonusTodayScore: 0,
    userPostcardTodayScore: 0,

    /*** Community ***/  
    todaysCheckins: 0,
    yesterdaysCheckins: 0,
    todaysBonuses: 0,
    yesterdaysBonuses: 0,
  
    drops: [],
    communityBonus: [],
    numberOfBonuses: 0,
    numberOfDropsToday: 0,
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

    // getPointsBehindObject
    getPointsBehindObject: (state) => (category) => {
      if (state[`user${category}Rank`] === null) {
        return {
          rank: 0,
          points: 0,
          today: 0,
          behind: 0,
        }
      }
      const pointsOfUserAhead = state.getLeaderboardScoreByRank(state[`user${category}Rank`], category.toUpperCase());

      return {
        rank: state[`user${category}Rank`],
        points: state[`user${category}Score`],
        today: state[`user${category}TodayScore`],
        behind: pointsOfUserAhead - state[`user${category}Score`],
      }
    },
    // get yesterdays leaderboard winners for each leaderboard
    getYesterdaysLeaderboardWinners: (state) => {
      return {
        Overall: state.OVERALL_YESTERDAY[0] || null,
        Checkin: state.CHECKIN_YESTERDAY[0] || null,
        Bonus: state.BONUS_YESTERDAY[0] || null,
        Postcard: state.POSTCARD_YESTERDAY[0] || null,
      }
    },

    // get yesterdays leaderboard winner
    getYesterdaysLeaderboardWinner: (state) => {
      return state.OVERALL_YESTERDAY.find((user) => user.rank === 1)
    },

    // get number of bonuses
    getNumberOfBonuses: (state) => {
      return state.communityBonus.length;
    },

    // get number of bonuses today
    getNumberOfBonusesToday: (state) => {
      return state.communityBonus.filter((bonus) => bonus.createdAt.includes(new Date().toISOString().split("T")[0])).length;
    },

    // get user rank
    getUserRank: (state) => (category) => {
      if (!state[`user${category}Rank`]) {
        return 'Hmmm';
      }
      return state[`user${category}Rank`];
    },

    // get user score
    getUserScore: (state) => (category) => {
      return state[`user${category}Score`];
    },

    getLeaderboardScoreByRank: (state) => (rank, category) => {
      console.log("getLeaderboardScoreByRank", rank, category);
      const leaderboardUser = state[`${category}_ALLTIME`][rank - 2];
      if (!leaderboardUser) {
        return 0;
      }
      return leaderboardUser.score;
    },

    // get user today score
    getUserTodayScore: (state) => (category) => {
      return state[`user${category}TodayScore`];
    },

    // get todays checkins
    getTodaysCheckins: (state) => {
      return state.todaysCheckins;
    },

    // get todays bonuses
    getTodaysBonuses: (state) => {
      return state.todaysBonuses;
    },

    // get yesterdays bonuses
    getYesterdaysBonuses: (state) => {
      return state.yesterdaysBonuses;
    },

    // get yesterdays checkins
    getYesterdaysCheckins: (state) => {
      return state.yesterdaysCheckins;
    },

    // get drops
    getDrops: (state) => {
      return state.drops.map((drop) => {
        return flattenSite(drop);
      });
    },

    // get number of drops today
    getNumberOfDropsToday: (state) => {
      return state.drops.filter((drop) => drop.dropDate.includes(new Date().toISOString().split("T")[0])).length;
    },

    // get community bonuses
    getCommunityBonuses: (state) => {
      // Community bonuses that were added today
      return state.communityBonus
        .map((bonus) => flattenSite(bonus));
    },

  },
  actions: {
    initializeSocket() {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user.userId
      this.socket = io(API_URL, {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
        transports: ['websocket', 'polling'],
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

      this.socket.on("leaderboards-update", (data) => {
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
      });

      this.socket.on("user-leaderboard-update", (data) => {
        // AllTime
        this.userOverallScore = data.userOverallScore;
        this.userOverallRank = data.userOverallRank;
        this.userCheckinScore = data.userCheckinScore;
        this.userCheckinRank = data.userCheckinRank;
        this.userBonusScore = data.userBonusScore;
        this.userBonusRank = data.userBonusRank;
        this.userPostcardScore = data.userPostcardScore;
        this.userPostcardRank = data.userPostcardRank;
        // Today
        this.userOverallTodayScore = data.userOverallTodayScore;
        this.userCheckinTodayScore = data.userCheckinTodayScore;
        this.userBonusTodayScore = data.userBonusTodayScore;
        this.userPostcardTodayScore = data.userPostcardTodayScore;

        console.log("user-leaderboard-update", data);
      });

      this.socket.on("checkin-update", (data) => {
        this.todaysCheckins = data.today;
        this.yesterdaysCheckins = data.yesterday;
      });

      this.socket.on("postcard-drops-update", (data) => {
        this.drops = data;
      });

      this.socket.on("bonus-update", (data) => {
        this.communityBonus = data;
      });
      this.socket.on("bonus-claim-update", (data) => {
        console.log("bonus-claim-update", data);
        this.todaysBonuses = data.today;
        this.yesterdaysBonuses = data.yesterday;
      });
    },
  },
});
