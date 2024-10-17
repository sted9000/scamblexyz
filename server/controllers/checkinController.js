const { Checkin, CheckinEvent } = require("../models");
const { leaderboardQueue } = require("../services/leaderboardLogic");
const { checkinQueue } = require("../services/checkinLogic");
const { sequelize, User } = require("../models");
const { checkinPoints } = require("../utils/pointsAlgorithms");

const checkinController = {
  /*** Get all checkins objects for a user ***/
  async getCheckins(req, res) {
    try {
      const checkin = await Checkin.findAll({
        where: {
          userId: req.user.userId,
        },
      });

      res.json(checkin);
    } catch (error) {
      console.error("Error fetching sites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  /*** Update a checkin object for a user ***/
  async updateCheckin(req, res) {
    const transaction = await sequelize.transaction();
    const userId = req.user.userId;
    const { SiteId } = req.body;
    try {
      // 1. Find the Checkin record
      const checkin = await Checkin.findOne({
        where: {
          UserId: userId,
          SiteId,
        },
        include: [
          {
            model: User,
            attributes: ["username", "userIcon", "createdAt"],
          },
        ],
      });

      // 2. Update the Checkin record
      checkin.lastVisit = new Date();
      checkin.currentStreak += 1;
      if (checkin.currentStreak > checkin.longestStreak) {
        checkin.longestStreak = checkin.currentStreak;
      }
      await checkin.save({ transaction });

      // 3. Create a new CheckinEvent record
      const checkinEvent = await CheckinEvent.create(
        {
          UserId: userId,
          SiteId,
          CheckinId: checkin.id,
          checkinTime: new Date(),
          checkinType: checkin.checkinType,
          streakCount: checkin.currentStreak,
        },
        { transaction }
      );
      // 4. Save the transaction
      await transaction.commit();

      // 5. Leaderboard Update Logic
      leaderboardQueue.add({
        userId,
        username: checkin.User.username,
        userIcon: checkin.User.userIcon,
        createdAt: checkin.User.createdAt,
        category: "checkin",
        value: checkinPoints(checkin.currentStreak),
      });
      checkinQueue.add();

      // 6. Return the updated Checkin record
      res.json(checkin);
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating checkin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = checkinController;
