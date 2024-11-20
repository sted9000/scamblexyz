const schedule = require('node-schedule');
const { Site, Drop, Batch } = require('../models');
const POSTCARD_DROPS_KEY = "postcard:drops";


const fetchPostcardDropsFromRedis = async (redisClient) => {
  try {
    const drops = await redisClient.zrevrange(
        POSTCARD_DROPS_KEY,
        0,
        50,
        "WITHSCORES"
    );
    return formatDrops(drops);
  } catch (error) {
    console.error("Error updating leaderboards:", error);
  }
}

function formatDrops(drops) {
  const formatted = [];
  for (let i = 0; i < drops.length; i += 2) {
    const [dropId, dropDate, siteId, source] = drops[i].split(":");
    formatted.push({
      dropId,
      dropDate,
      siteId,
      source,
    });
  }
  return formatted;
}

const dailyPostcardSiteRatingsUpdate = () => {
  /*** Updates the postcard ratings for each site every day ***/
schedule.scheduleJob('0 0 * * *', async () => {
  console.log('Starting daily database update job...');
  
  try {

    // Get all the sites where isPostcard is truthy
    const postcardSites = await Site.findAll({
      where: {
        isPostcard: true
      },
      // Include the drops and batches associated with each site
      include: [{
        model: Drop,
        attributes: ['dropDate'],
        include: [{
          model: Batch,
          attributes: ['submissionDate']
        }]
      }]
    });

    console.log(postcardSites);

    // Calculate the following:
    // - average lead time for each site
    // - consistency rating for each site
    // - popularity rating for each site
    postcardSites.forEach( async (site) => {

      // Only keep the drops from the last 3 months
      const threeMonthsAgo = new Date(Date.now() - (3 * 30 * 24 * 60 * 60 * 1000));
      site.drops = site.Drops.filter(drop => new Date(drop.dropDate) > threeMonthsAgo);

      // Calculate the average lead time for each site
      const leadTimes = site.Drops.map(drop => differenceInDates(drop.dropDate, drop.Batches[0].submissionDate));
      const averageLeadTime = leadTimes.reduce((acc, curr) => acc + curr, 0) / leadTimes.length;
      site.postcardLeadTime = averageLeadTime;

      // Calculate the consistency rating for each site
      // Determine how many weeks had a drop
      const weeksWithDrops = site.Drops.map(drop => drop.dropDate.getWeek());
      const uniqueWeeksWithDrops = [...new Set(weeksWithDrops)];
      const consistencyScore = uniqueWeeksWithDrops.length
      site.postcardConsistancy = consistencyScore

      // Calculate the popularity rating for each site
      // The total number of cardsProcessed
      const totalCardsProcessed = site.Drops.reduce((acc, curr) => acc + curr.cardsProcessed, 0);
      site.postcardPopularity = totalCardsProcessed;

      // Update the site with the new values
      await site.save();
    });
  } catch (error) {
    console.error('Error in dailyPostcardSiteRatingsUpdate:', error);
  }
});
};


module.exports = {
  fetchPostcardDropsFromRedis, dailyPostcardSiteRatingsUpdate

};
