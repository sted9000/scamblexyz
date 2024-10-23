import { useRealtimeStore } from "@/stores/realtime";
const realtimeStore = useRealtimeStore();

export const setMedianLeadTimes = (drops) => {
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

export const batchStatus = (batch) => {
  if (batch.pendingCards === 0) {
    return "Complete";
  } else if (batch.pendingCards !== batch.totalCards) {
    return "Partially Credited";
  } else {
    return "Pending";
  }
};

export const communityRankFormatting = (rank) => {
  if (rank === 1) {
    return "1st";
  } else if (rank === 2) {
    return "2nd";
  } else if (rank === 3) {
    return "3rd";
  } else if (rank === 'Hmmm') {
    return 'Hmmm';
  } else {
    return `${rank}th`;
  }
};

export const pointsBehindFormatting = (category) => {
  const userRank = realtimeStore.getUserRank(category);
  if (userRank === 1) {
    return "You're in 1st place!";
  }

  const score = realtimeStore.getUserScore(category);
  if (!score) {
    return "You're not on the leaderboard yet!";
  } 
  const playerAboveRank = userRank - 1;
  const categoryUpper = category.toUpperCase();
  const playerAboveScore = realtimeStore.getLeaderboardScoreByRank(playerAboveRank, categoryUpper);
  const pointsBehind = playerAboveScore - score;
  return `${pointsBehind} Points Behind ${playerAboveRank} Place`;
};
