const { UserSites, User, Site } = require("../models");

const userController = {
  async getSites(req, res) {
    try {
      const sites = await UserSites.findAll({
        where: {
          UserId: req.user.userId,
        },
        include: [
          {
            model: Site,
            attributes: ["imagePath", "fullName", "isPostcard", "postcardValue", "postcardLeadTime", "postcardConsistancy", "postcardPopularity"],
          },
        ],
      });
      res.json(sites);
    } catch (error) {
      console.error("Error fetching sites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateEnabledSite(req, res) {
    try {
      const { siteId } = req.params;
      const updatedProperty = req.body;
      const key = Object.keys(updatedProperty)[0];
      const value = updatedProperty[key];
      console.log("Changed sites", updatedProperty);
      const site = await UserSites.findOne({
        where: {
            userId: req.user.userId,
            siteId,
          }
        });
      site[key] = value;
      await site.save();
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