const Bull = require('bull');
const {redisClient, redisConfig} = require('../config/redis');
const { getIOInstance } = require('../config/socket');
const bonusQueue = new Bull('BonusQueue', redisConfig);
const { CommunityBonus, Site } = require('../models');
const moment = require('moment');

// Process jobs
// Inside your job processing function
bonusQueue.process(async (job) => {
  const io = getIOInstance();
  if (io) {
    try {

      /*** First Update the Number of Bonuses Claimed Today and Yesterday ***/
      // get the current date
      const today = moment().format("YYYY-MM-DD");
      const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");

      // increment the todaysBonuses
      await redisClient.incr(`bonuses:${today}`);

      // get the todaysBonuses
      const todaysBonuses = await redisClient.get(`bonuses:${today}`);
      const yesterdaysBonuses = await redisClient.get(`bonuses:${yesterday}`);

      // send the todaysBonuses and yesterdaysBonuses to the client
      io.emit("bonus-claim-update", { today: todaysBonuses, yesterday: yesterdaysBonuses });

      /*** Second Update the CommunityBonus Table ***/
      const userBonus = job.data;
      console.log("Handling new bonus in queue", userBonus);
      // See if the userBonus is in CommunityBonus table
      const communityBonus = await CommunityBonus.findOne({ 
        where: { 
          amount: userBonus.amount,
          rewardType: userBonus.rewardType,
          bonusAmount: userBonus.bonusAmount,
          bonusType: userBonus.bonusType,
          claimLimit: userBonus.claimLimit,
          siteId: userBonus.siteId
        } 
      });
      // If it is, update the communityBonus
      if (communityBonus) {
        communityBonus.claimedCount += 1;
        await communityBonus.save();
      }

      // Otherwise, create a new communityBonus
      if (!communityBonus) {
        await CommunityBonus.create({
          amount: userBonus.amount,
          rewardType: userBonus.rewardType,
          bonusAmount: userBonus.bonusAmount,
          bonusType: userBonus.bonusType,
          claimLimit: userBonus.claimLimit,
          siteId: userBonus.siteId,
          // userBonusId: userBonus.id
        });
      }

      // Get all bonuses from the CommunityBonus table
      const bonuses = await CommunityBonus.findAll({
        include: [{
          model: Site,
          attributes: ["imagePath", "fullName", "isPostcard"],
        }]
      });
      
      // Emit the bonuses to the client
      io.emit("bonus-update", bonuses);
      return { success: true };
    } catch (error) {
      console.error("Error handling new bonus", error);
      return { success: false };
    }
  }

  return job.data;
});

module.exports = {bonusQueue};