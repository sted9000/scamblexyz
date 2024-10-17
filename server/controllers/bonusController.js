const { Bonus, BonusClaim, BonusEvent, sequelize } = require("../models");
const { bonusQueue } = require("../services/bonusLogic");
const { bonusPoints } = require("../utils/pointsAlgorithms");
const { leaderboardQueue } = require("../services/leaderboardLogic");
const { userQueue } = require("../services/userLogic");
const { calculateBonus } = require("../utils/calculateBonus");

const bonusController = {

  /*** Get all bonuses for a user ***/
  async getUserBonuses(req, res) {
    // query the user's bonuses
    try {
      const claimBonus = await BonusClaim.findAll({
        where: {
          UserId: req.user.userId,
        },
        include: [{
          model: Bonus,
          attributes: { exclude: ['userId'] },
        }],
      });
      res.json(claimBonus);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /*** Create a new bonus ***/
  async createBonus(req, res) {

    try {      
      
      // First check if this bonus already exists
      const bonus = await Bonus.findOne({
        where: {
          siteId: req.body.siteId,
          bonusType: req.body.bonusType,
          bonusAmount: req.body.bonusAmount,
          amount: req.body.amount,
          claimLimit: req.body.claimLimit,
        },
      });

      // If the bonus exists...
      //... add a ClaimBonus and BonusEvent
      //... update realtime dbs
      // Todo: Don't update add a BonusEvent if the user has already confirmed the bonus
      if (bonus) {
        // BonusEvent add
        await BonusEvent.create({
          bonusId: bonus.id,
          userId: req.user.userId,
          event: "confirmed",
        });
        // ClaimBonus add
        await BonusClaim.create({
          bonusId: bonus.id,
          userId: req.user.userId,
        });

        // Update realtime dbs
        bonusQueue.add(bonus);
        userQueue.add({ userId: req.user.userId, change: calculateBonus(bonus) });
        leaderboardQueue.add({
          userId: req.user.userId,
          username: req.user.username,
          userIcon: req.user.userIcon,
          createdAt: req.user.createdAt,
          category: 'bonus',
          value: bonusPoints(bonus),
        });

        // Return the claimBonus to the user
        res.json(claimBonus);
      }

      // If bonus does not exist, create it
      const result = await sequelize.transaction(async (t) => {
        const newBonus = await Bonus.create({
          ...req.body,
          userId: req.user.userId,
        }, { transaction: t });

        const claimBonus = await BonusClaim.create({
          bonusId: newBonus.id,
          userId: req.user.userId,
        }, { transaction: t });

        return { bonus: newBonus, claimBonus: claimBonus };
      });

      // Find the claimBonus (include the bonus details)
      const claimBonus = await BonusClaim.findByPk(result.claimBonus.id, {
        include: [{
          model: Bonus,
          attributes: { exclude: ['userId'] },
        }],
      });

      // Update the bonus in the cache
      bonusQueue.add(result.bonus);
      userQueue.add({ userId: req.user.userId, change: calculateBonus(result.bonus) });

      // Update the leaderboard with one point for the bonus
      leaderboardQueue.add({
        userId: req.user.userId,
        username: req.user.username,
        userIcon: req.user.userIcon,
        createdAt: req.user.createdAt,
        category: "bonus",
        value: 1,
      });

      // Return the claimBonus to the user
      res.json(claimBonus);

    } catch (error) {
      console.error("Error creating bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /*** Update a bonus ***/
  async updateBonus(req, res) {
    const { id } = req.params;
    try {
      // First make sure the bonus exists
      const bonus = await Bonus.findByPk(id);
      if (!bonus) {
        console.log("Bonus not found", id);
        res.status(404).json({ message: "Bonus not found" });
        return;
      }

      // Make a ClaimBonus
      const claimBonus = await BonusClaim.create({
        bonusId: bonus.id,
        userId: req.user.userId,
        claimDate: new Date(),
      });

      // See if the user has already made a BonusEvent for this bonus
      const bonusEvent = await BonusEvent.findOne({
        where: {
          bonusId: bonus.id,
          userId: req.user.userId,
        },
      });
      
      // If the user has not made a BonusEvent for this bonus yet, add one and update the confirmedCount
      if (!bonusEvent && (bonus.userId !== req.user.userId)) {  
        await BonusEvent.create({
          bonusId: bonus.id,
          userId: req.user.userId,
        });
        bonus.confirmedCount += 1;
      }

      // Update the bonus in the database
      // Note this will update the updatedAt field even if nothing has changed
      await bonus.save();

      // Update the realtime dbs
      bonusQueue.add(bonus);
      userQueue.add({ userId: req.user.userId, change: calculateBonus(bonus) });
      leaderboardQueue.add({
        userId: req.user.userId,
        username: req.user.username,
        userIcon: req.user.userIcon,
        createdAt: req.user.createdAt,
        category: 'bonus',
        value: bonusPoints(bonus),
      });

      // Return the ClaimBonus by the findbonusId
      const bonusToReturn = await BonusClaim.findByPk(claimBonus.id, {
        include: [{
          model: Bonus,
          attributes: { exclude: ['userId'] },
        }],
      });

      // Return the ClaimBonus to the user
      res.json(bonusToReturn);

    } catch (error) {
      console.error("Error updating bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = bonusController;
