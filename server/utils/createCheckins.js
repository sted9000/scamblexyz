const { Site, Checkin } = require("../models");

async function createCheckinsForUser(userId) {
  try {
    const sites = await Site.findAll();
    const checkins = sites.map((site) => ({
      UserId: userId,
      SiteId: site.id,
      lastVisit: null,
      currentStreak: 0,
      longestStreak: 0
    }));

    await Checkin.bulkCreate(checkins);
  } catch (error) {
    console.error("Error creating checkins:", error);
    throw error;
  }
}

module.exports = createCheckinsForUser;
