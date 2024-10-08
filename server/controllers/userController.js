const { UserSites, User } = require("../models");

const userController = {
  async getSites(req, res) {
    try {
      const sites = await UserSites.findAll({
        where: {
          UserId: req.user.userId,
        }
      });
      res.json(sites);
    } catch (error) {
      console.error("Error fetching sites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateEnabledSites(req, res) {
    try {
      const { changedSites } = req.body;
      console.log("Changed sites", changedSites);
      for (const siteId in changedSites) {
        const site = await UserSites.findOne({
          where: {
            userId: req.user.userId,
            siteId,
          }
        });
        site.isEnabled = changedSites[siteId];
        await site.save();
      }
      res.json({ message: "Sites updated successfully" });
    } catch (error) {
      console.error("Error updating sites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateProfile(req, res) {
    try {
      const { username, userIcon } = req.body;
      console.log("Updating profile", username, userIcon);
      const user = await User.findByPk(req.user.userId);
      user.username = username;
      user.userIcon = userIcon;
      await user.save();
      res.json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = userController;