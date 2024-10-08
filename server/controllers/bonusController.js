const { Bonus, ClaimBonus, sequelize } = require("../models");

const bonusController = {
  async getCommunityBonuses(req, res) {
    // query all the bonuses
    try {
      const bonuses = await Bonus.findAll();
      res.json(bonuses);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getUserBonuses(req, res) {
    // query the user's bonuses
    try {
      const claimBonus = await ClaimBonus.findAll({
        where: {
          UserId: req.user.userId,
        },
        include: [{
          model: Bonus,
          attributes: ['id', 'siteId', 'bonusType', 'bonusAmount', 'amount', 'confirmedCount', 'createdAt', 'updatedAt'],
        }],
      });
      res.json(claimBonus);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async createBonus(req, res) {

    try {
      // First check if this bonus already exists
      const bonus = await Bonus.findOne({
        where: {
          siteId: req.body.siteId,
          bonusType: req.body.bonusType,
          bonusAmount: req.body.bonusAmount,
          amount: req.body.amount,
        },
      });
      if (bonus) {

        // Confirm the bonus
        bonus.confirmedCount += 1;
        await bonus.save();

        // Create the ClaimBonus
        const claimBonus = await ClaimBonus.create({
          bonusId: bonus.id,
          userId: req.user.userId,
        });

        // Update the bonus in the cache
        // TODO

        // Return the claimBonus to the user
        res.json(claimBonus);
      }

      // Create the bonus and ClaimBonus in a transaction
      const result = await sequelize.transaction(async (t) => {
        const newBonus = await Bonus.create({
          ...req.body,
          userId: req.user.userId,
        }, { transaction: t });

        const claimBonus = await ClaimBonus.create({
          bonusId: newBonus.id,
          userId: req.user.userId,
        }, { transaction: t });

        return { bonus: newBonus, claimBonus: claimBonus };
      });

      // Todo: Add the bonus to the cache

      // Find the claimBonus (include the bonus details)
      const claimBonus = await ClaimBonus.findByPk(result.claimBonus.id, {
        include: [{
          model: Bonus,
          attributes: ['id', 'siteId', 'bonusType', 'bonusAmount', 'amount', 'confirmedCount', 'createdAt', 'updatedAt'],
        }],
      });
      res.json(claimBonus);

    } catch (error) {
      console.error("Error creating bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateBonus(req, res) {
    const { id } = req.params;
    try {
      const bonus = await Bonus.findByPk(id);
      if (!bonus) {
        res.status(404).json({ message: "Bonus not found" });
        return;
      }
      // update the confirmedCount
      bonus.confirmedCount += 1;
      await bonus.save();
      res.json(bonus);
    } catch (error) {
      console.error("Error updating bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = bonusController;
