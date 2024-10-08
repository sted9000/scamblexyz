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
