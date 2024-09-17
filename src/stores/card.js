import { defineStore } from "pinia";
// import { authenticatedApiCall, handleError } from "../apiService";

export const useCardStore = defineStore("card", {
  state: () => ({
    card: [],
    userCard: [],
    initialCardLoad: true,
  }),
  getters: {
    getCards: (state) => {
      return state.card ?? [];
    },
    getUserCards: (state) => {
      return state.userCard ?? [];
    },
    getCardLoading: (state) => {
      return state.initialCardLoad;
    },
  },
  actions: {
    // async fetchCard() {
    //   try {
    //     const response = await authenticatedApiCall("GET", "/card");
    //     this.card = response.data;
    //     this.initialLoad = false;
    //   } catch (error) {
    //     handleError(error);
    //   }
    // },
    async fetchCard() {
      this.card = [
        {
          site: "Chumba",
          sentAt: 1672531200,
          creditedAt: 1688515200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1675209600,
          creditedAt: 1696550400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1677888000,
          creditedAt: 1701648000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1680566400,
          creditedAt: 1709424000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1683158400,
          creditedAt: 1704067200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1685836800,
          creditedAt: 1706745600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1688515200,
          creditedAt: 1714694400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1691193600,
          creditedAt: 1717372800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1693872000,
          creditedAt: 1725408000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1696550400,
          creditedAt: 1720051200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1699228800,
          creditedAt: 1722729600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1701820800,
          creditedAt: 1725408000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1704499200,
          creditedAt: 1728086400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1707177600,
          creditedAt: 1730764800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1709856000,
          creditedAt: 1733443200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1712534400,
          creditedAt: 1736121600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1715212800,
          creditedAt: 1738800000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1717891200,
          creditedAt: 1741478400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1720569600,
          creditedAt: 1744156800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1723248000,
          creditedAt: 1746835200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1725926400,
          creditedAt: 1749513600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1728604800,
          creditedAt: 1752192000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1731283200,
          creditedAt: 1754870400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1733961600,
          creditedAt: 1757548800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1736640000,
          creditedAt: 1760227200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1739318400,
          creditedAt: 1762905600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1741996800,
          creditedAt: 1765584000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1744675200,
          creditedAt: 1768262400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1747353600,
          creditedAt: 1770940800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1750032000,
          creditedAt: 1773619200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1752710400,
          creditedAt: 1776297600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1755388800,
          creditedAt: 1778976000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1758067200,
          creditedAt: 1781654400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1760745600,
          creditedAt: 1784332800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1763424000,
          creditedAt: 1787011200 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1766102400,
          creditedAt: 1789689600 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Chumba",
          sentAt: 1768780800,
          creditedAt: 1792368000 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "Modo",
          sentAt: 1771459200,
          creditedAt: 1795046400 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "High5",
          sentAt: 1774137600,
          creditedAt: 1797724800 + Math.floor(Math.random() * 10000000),
        },
        {
          site: "LuckyLand",
          sentAt: 1776816000,
          creditedAt: 1800403200 + Math.floor(Math.random() * 10000000),
        },
        // {
        //   username: "user1",
        //   site: "Site A",
        //   sentAt: 1672531200000,
        //   creditedAt: 1704067200000,
        //   numberOfCards: 5,
        // },
        // {
        //   username: "user2",
        //   site: "Site B",
        //   sentAt: 1675209600000,
        //   creditedAt: 1706745600000,
        //   numberOfCards: 3,
        // },
        // {
        //   username: "user3",
        //   site: "Site C",
        //   sentAt: 1677888000000,
        //   creditedAt: 1709424000000,
        //   numberOfCards: 7,
        // },
        // {
        //   username: "user4",
        //   site: "Site D",
        //   sentAt: 1680566400000,
        //   creditedAt: 1712102400000,
        //   numberOfCards: 2,
        // },
        // {
        //   username: "user5",
        //   site: "Site E",
        //   sentAt: 1683158400000,
        //   creditedAt: 1714694400000,
        //   numberOfCards: 6,
        // },
        // {
        //   username: "user6",
        //   site: "Site F",
        //   sentAt: 1685836800000,
        //   creditedAt: 1717372800000,
        //   numberOfCards: 4,
        // },
        // {
        //   username: "user7",
        //   site: "Site G",
        //   sentAt: 1688515200000,
        //   creditedAt: 1720051200000,
        //   numberOfCards: 8,
        // },
        // {
        //   username: "user8",
        //   site: "Site H",
        //   sentAt: 1691193600000,
        //   creditedAt: 1722729600000,
        //   numberOfCards: 1,
        // },
        // {
        //   username: "user9",
        //   site: "Site I",
        //   sentAt: 1693872000000,
        //   creditedAt: 1725408000000,
        //   numberOfCards: 9,
        // },
        // {
        //   username: "user10",
        //   site: "Site J",
        //   sentAt: 1696550400000,
        //   creditedAt: 1728086400000,
        //   numberOfCards: 5,
        // },
      ];
      this.initialLoad = false;
    },
    async fetchUserCard() {
      this.userCard = [
        {
          id: 0,
          site: "Chumba",
          sentAt: 1672531200,
          creditedAt: null,
          estimatedAt: 1672531200 + 15778476, // Adding an estimated timestamp
          sent: 10,
          credited: 0,
          estimated: 16,
          image: "/images/icon-chumba.png",
        },
        {
          id: 1,
          site: "Modo",
          sentAt: 1675209600,
          creditedAt: 1696550400 + Math.floor(Math.random() * 10000000),
          estimatedAt: 1675209600 + 15778476, // Adding an estimated timestamp
          sent: 54,
          credited: 10,
          estimated: 24,
          image: "/images/icon-chumba.png",
        },
        {
          id: 2,
          site: "High5",
          sentAt: 1677888000,
          creditedAt: 1701648000 + Math.floor(Math.random() * 10000000),
          estimatedAt: 1677888000 + 15778476, // Adding an estimated timestamp
          sent: 10,
          credited: 10,
          estimated: 10,
          image: "/images/icon-chumba.png",
        },
        {
          id: 3,
          site: "LuckyLand",
          sentAt: 1680566400,
          creditedAt: 1709424000 + Math.floor(Math.random() * 10000000),
          estimatedAt: 1680566400 + 15778476, // Adding an estimated timestamp
          sent: 10,
          credited: 10,
          estimated: 6,
          image: "/images/icon-chumba.png",
        },
        {
          id: 4,
          site: "Chumba",
          sentAt: 1683158400,
          creditedAt: 1704067200 + Math.floor(Math.random() * 10000000),
          estimatedAt: 1683158400 + 15778476, // Adding an estimated timestamp
          sent: 10,
          credited: 10,
          estimated: 18,
          image: "/images/icon-chumba.png",
        },
      ];
    },
  },
});
