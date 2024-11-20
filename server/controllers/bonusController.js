const { UserBonus, Site } = require("../models");
const { leaderboardQueue } = require("../queues/leaderboardQueue")
const { bonusQueue } = require("../queues/bonusQueue");

const bonusController = {

  /*** Get all bonuses for a user ***/
  async getBonus(req, res) {
    try {
      const UserBonuses = await UserBonus.findAll({
        where: {
          userId: req.user.userId,
        },
        include: [{
          model: Site,
          attributes: ["imagePath", "fullName", "isPostcard"],
        }]
      });
      res.json(UserBonuses);
    } catch (error) {
      console.error("Error fetching bonuses:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /*** Create a new bonus ***/
  async createBonus(req, res) {

    console.log("Creating bonus", req.body);
    console.log("User", req.user);

    try {
      // 1. create the UserBonus
      const userBonus = await UserBonus.create({
        amount: req.body.amount,
        bonusAmount: req.body.bonusAmount,
        bonusType: req.body.bonusType,
        rewardType: req.body.rewardType,
        claimLimit: req.body.claimLimit,
        siteId: req.body.siteId,
        communityBonusId: req.body.id || null,
        userId: req.user.userId,
      });
      

      // 2. Add items to queues (bonusQueue and leaderboardQueue)
      bonusQueue.add(userBonus);
      leaderboardQueue.add({
        userId: req.user.userId,
        username: req.user.username,
        userIcon: req.user.userIcon,
        createdAt: req.user.createdAt,
        category: "bonus",
        value: 1,
      });

      // 3. Return the userBonus to the user (with site info)
      const userBonusWithSite = await UserBonus.findByPk(userBonus.id, {
        include: [{
          model: Site,
          attributes: ["imagePath", "fullName", "isPostcard"],
        }]
      });
      res.json(userBonusWithSite);

    } catch (error) {
      console.error("Error creating bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /*** Update a bonus ***/
  async updateBonus(req, res) {
    
    try {
      // 1. Make sure the bonus exists
      const { id } = req.params;
      const userBonus = await UserBonus.findByPk(id);

      if (!userBonus) {
        console.log("Bonus not found", id);
        res.status(404).json({ message: "Bonus not found" });
        return;
      }

      // 2. Update the bonus
      const updatedUserBonus = await UserBonus.update(req.body, { where: { id } });

      // Get the updated bonus
      const updatedBonus = await UserBonus.findByPk(id, {
        include: [{
          model: Site,
          attributes: ["imagePath", "fullName", "isPostcard"],
        }]
      });

      // 3. Return the ClaimBonus to the user
      res.json(updatedBonus);

    } catch (error) {
      console.error("Error updating bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /*** Delete a bonus ***/
  async deleteBonus(req, res) {
    
    try {
      // 1. Delete the UserBonus
      const { id } = req.params;
      await UserBonus.destroy({ where: { id } });
      
      // 2. Return success to the user
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting bonus:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },


};

module.exports = bonusController;
