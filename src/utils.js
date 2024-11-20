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

/**
 * Calculates a score for a bonus based on its properties
 * @param {Object} bonus - The bonus object to rate
 * @param {Date|string} bonus.updatedAt - When the bonus was last updated
 * @param {number} bonus.value - The monetary value of the bonus
 * @param {number} bonus.claimCount - How many times the bonus has been claimed
 * @returns {number} A score between 0 and 100
 */
export const recommendedBonusScore = (bonus) => {
  // Convert updatedAt to Date object if it's a string
  const updateDate = new Date(bonus.updatedAt);
  const now = new Date();

  // Calculate recency score (higher for more recent updates)
  // We'll use a 30-day window as reference
  const daysDifference = (now - updateDate) / (1000 * 60 * 60 * 24);
  const recencyScore = Math.max(0, 100 - (daysDifference * (100/30)));
  
  // Calculate value score (logarithmic scale to handle wide range of values)
  // Assuming values typically range from 0 to 1000
  const value = bonus.bonusAmount - bonus.amount;
  const valueScore = Math.min(100, Math.log10(value + 1) * 25);
  
  // Calculate claim count score (logarithmic scale)
  // Assuming claim counts typically range from 0 to 100
  const claimScore = Math.min(100, Math.log10(bonus.claimedCount + 1) * 50);
  console.log(bonus.fullName, claimScore);
  // Weight the different components
  // You can adjust these weights based on importance
  const weights = {
      recency: 0.4,
      value: 0.35,
      claims: 0.25
  };
  
  // Calculate final weighted score
  const finalScore = (
      recencyScore * weights.recency +
      valueScore * weights.value +
      claimScore * weights.claims
  );

  console.log(bonus.fullName, finalScore);
  
  // Round to 2 decimal places
  return Math.round(finalScore * 100) / 100;
}

export const rawPathToImagePath = (path) => {
  return `/images/icon-${path}`;
}

export const flattenSites = (sites) => {
  /***
   * Function does the following:
   * 1. Maps the imagePath to the full path and adds it to the site object
   * 2. Maps the fullName to the site object
   * 3. Maps the isPostcard to the site object
   */

  return sites.map((site) => ({ ...site, imagePath: rawPathToImagePath(site.Site.imagePath), fullName: site.Site.fullName, isPostcard: site.Site.isPostcard }));
}

export const flattenSite = (item) => {
  console.log("item", item);
  return { ...item, imagePath: rawPathToImagePath(item.Site.imagePath), fullName: item.Site.fullName, isPostcard: item.Site.isPostcard };
}

/*** Set checkin availability status for each site */
const setSiteAvailability = (site) => {

  // If lastVisit is null, then the site has never been visited
  if (!site.lastVisit) {
    return {isAvailable: true, datetime: null};
  }

  // Daily Checkin
  // See if the last checkin was after the today at checkinTime
  if (site.Site.checkinType === "DAILY") {
    
    // First set today's checkin time 
    const todayCheckinTime = new Date().setHours(
      site.Site.checkingResetTime.split(":")[0],
      site.Site.checkingResetTime.split(":")[1]
    );
    
    // Now see if it is currently before today's checkin time
    const isBeforeCheckinTime = new Date() < new Date(todayCheckinTime);

    // If it is before today's checkin time
    if (isBeforeCheckinTime) {
      
      // See if you checked in in the 24 hours before today's checkin time
      const isIn24Hours = new Date(site.lastVisit) > new Date(todayCheckinTime - 24 * 60 * 60 * 1000);

      // If you did not, then the site is available
      if (!isIn24Hours) {
        return {isAvailable: true, datetime: null};
      } else {
        return {isAvailable: false, datetime: new Date(todayCheckinTime)};
      }
    }

    // If it is after today's checkin time
    else {
      
      // If you checked in between today's checkin time and now, then the site is not available
      if (new Date(site.lastVisit) > new Date(todayCheckinTime)) {
        const tomorrowCheckinTime = new Date(todayCheckinTime);
        tomorrowCheckinTime.setDate(tomorrowCheckinTime.getDate() + 1);
        return {isAvailable: false, datetime: tomorrowCheckinTime};
      } else {
        return {isAvailable: true, datetime: null};
      }
    }
  }

  // 24 Hour Checkin
  if (site.Site.checkinType === "24_HOUR") {
    // Set next available time: lastVisit + 24 hours  
    const nextAvailableTime = new Date(site.lastVisit);
    nextAvailableTime.setDate(nextAvailableTime.getDate() + 1);

    // If the next available time is in the past, then the site is available
    if (nextAvailableTime < Date.now()) {
      return {isAvailable: true, datetime: null};
    } 
    // Otherwise, the site is not available
    else {
      // If the next available time is today, then return the time
      if (nextAvailableTime.getDate() === new Date().getDate()) {
        return {isAvailable: false, datetime: nextAvailableTime};
      }
      // Otherwise, the next available time is tomorrow
      else {
        return {isAvailable: false, datetime: nextAvailableTime};
      }
    }
  }
  // Hourly Checkin
  if (site.Site.checkinType === "HOURLY") {
    // Set next available time
    // Note lastVisit is date while checkingResetTime is a time that needs to be added to the date
    const nextAvailableTime = new Date(site.lastVisit);
    const [hours, minutes, seconds] = site.Site.checkingResetTime.split(':').map(Number);
    // Add the hours, minutes, and seconds to the next available time
    nextAvailableTime.setHours(nextAvailableTime.getHours() + hours);
    nextAvailableTime.setMinutes(nextAvailableTime.getMinutes() + minutes);
    nextAvailableTime.setSeconds(nextAvailableTime.getSeconds() + seconds);

    // If the next available time is in the past, then the site is available
    if (nextAvailableTime < Date.now()) {
      return {isAvailable: true, datetime: null};
    } else {
      return {isAvailable: false, datetime: nextAvailableTime};
    }
  }
};


export const setCheckinStatus = (checkin) => {
  return checkin.map((item) => ({ ...item, availability: setSiteAvailability(item) }));
}

export const itemStatusFromAvailability = (availability) => {
  if (availability.isAvailable) {
    return "Available";
  } else {
    return `Checkin at ${availability.datetime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
}

export const postcardSiteValues = (site) => {
  return {
    postcardValue: site.postcardValue,

    // Convert days to months and up to the nearest whole number
    postcardLeadTime: Math.round(site.postcardLeadTime / 30),

    // Convert to a number between 0 and 5 (raw is between 0 and 13)
    postcardConsistancy: Math.round(site.postcardConsistancy / 2.6) ,

    // Convert to a number between 0 and 5 (raw is between 0 and infinity)
    // Set max of 5
    postcardPopularity: Math.min(Math.round(site.postcardPopularity / 200), 5)
  }
}