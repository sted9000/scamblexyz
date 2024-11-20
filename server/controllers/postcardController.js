const { Drop, Batch, BatchDrop, Site } = require("../models");
const {postcardQueue} = require("../queues/postcardQueue");
const {leaderboardQueue} = require("../queues/leaderboardQueue");

const postcardController = {
  /* Get Community Drops */
  async getDrops(req, res) {
    // query all the drops
    try {
      const drops = await Drop.findAll({
        include: [{
          model: Site,
          attributes: ["imagePath", "fullName", "isPostcard"],
        }]
      });
      res.json(drops);
    } catch (error) {
      console.error("Error fetching drops:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /* Add a drop */
  async addDrop(req, res) {
    try {
      const batchId = req.params.batchId;
      
      // Add the Drop entry
      const drop = await Drop.create(req.body);

      // Add a BatchDrop entry
      const batchdrop = await BatchDrop.create({
        batchId: batchId,
        dropId: drop.id,
        dropType: drop.dropType,
        cardsProcessed: req.body.cardsProcessed,
      });

      // Update the Batch item
      const batch = await Batch.findByPk(batchId);
      batch.pendingCards -= req.body.cardsProcessed;
      if (drop.dropType === "drop") {
        batch.creditedCards += req.body.cardsProcessed;
      } else if (drop.dropType === "rejection") {
        batch.rejectedCards += req.body.cardsProcessed;
      }
      await batch.save();
      // Return the updated Batch (with associated Drops)
      const updatedBatch = await Batch.findByPk(batchId, {
        include: [
          {
            model: Drop,
            through: {
              attributes: ["cardsProcessed", "dropType"],
            },
          },
          {
            model: Site,
            attributes: ["imagePath", "fullName", "isPostcard"],
          },
        ],
      });

      // Add the drop to queue
      postcardQueue.add({
        dropId: drop.id,
        dropDate: drop.dropDate,
        siteId: drop.siteId,
        source: drop.source,
      });

      res.json(updatedBatch);
    } catch (error) {
      console.error("Error creating drop:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /* Delete a drop */
  async deleteDrop(req, res) {
    console.log("Deleting drop:", req.params.dropId);
    try {
      // Find the drop and the batchdrop
      const batchdrop = await BatchDrop.findOne({
        where: { dropId: req.params.dropId },
      });
      console.log("batchdrop", batchdrop);
      const drop = await Drop.findByPk(batchdrop.dropId);

      // Update the Batch item
      const batch = await Batch.findByPk(batchdrop.batchId);
      batch.pendingCards += batchdrop.cardsProcessed;
      if (drop.dropType === "drop") {
        batch.creditedCards -= batchdrop.cardsProcessed;
      } else if (drop.dropType === "rejection") {
        batch.rejectedCards -= batchdrop.cardsProcessed;
      }
      await batch.save();

      // Delete the BatchDrop entry
      await BatchDrop.destroy({ where: { batchId: batchdrop.batchId, dropId: batchdrop.dropId } });

      // Delete the Drop entry
      await Drop.destroy({ where: { id: drop.id } });

      // Return the updated Batch (with associated Drops)
      const updatedBatch = await Batch.findByPk(batchdrop.batchId, {
        include: [
          {
            model: Drop,
            through: {
              attributes: ["cardsProcessed", "dropType"],
            },
          },
        ],
      });
      res.json(updatedBatch);
    } catch (error) {
      console.error("Error deleting drop:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /* Get User Batches */
  async getBatch(req, res) {
    // query all the users batches and join the batchdrops
    try {
      const batches = await Batch.findAll({
        where: { userId: req.user.userId },
        include: [
          {
            model: Drop,
            through: {
              attributes: ["cardsProcessed"],
            },
          },
          {
            model: Site,
            attributes: ["imagePath", "fullName", "isPostcard"],
          },
        ],
        order: [["submissionDate", "DESC"]], // Optional: order by submission date
      });

      res.json(batches);
    } catch (error) {
      console.error("Error fetching user batches with drops:", error);
      throw error;
    }
  },

  /* Add a batch */
  async addBatch(req, res) {
    console.log("Adding batch:", req.body);
    try {
      const batch = await Batch.create({
        ...req.body,
        pendingCards: req.body.totalCards,
        userId: req.user.userId,
      });

      const batchWithSite = await Batch.findByPk(batch.id, {
        include: [{
          model: Site,
          attributes: ["imagePath", "fullName", "isPostcard"],
        }]
      });

      // Update the leaderboard
      leaderboardQueue.add({
        userId: req.user.userId,
        username: req.user.username,
        userIcon: req.user.userIcon,
        createdAt: req.user.createdAt,
        category: "postcard",
        value: batch.totalCards,
      });

      res.json(batchWithSite);
    } catch (error) {
      console.error("Error creating batch:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /* Update a batch */
  async updateBatch(req, res) {
    try {
      const batch = await Batch.findByPk(req.params.id);
      if (!batch) {
        return res.status(404).json({ message: "Batch not found" });
      }
      await batch.update(req.body);

      // Get the batch with the associated drops
      const updatedBatch = await Batch.findByPk(req.params.id, {
        include: [
          {
            model: Drop,
            through: {
              attributes: ["cardsProcessed", "dropType"],
            },
          },
          {
            model: Site,
            attributes: ["imagePath", "fullName", "isPostcard"],
          },
        ],
      });
      
      res.json(updatedBatch);
    } catch (error) {
      console.error("Error updating batch:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  /* Get a site */
  async getSite(req, res) {
    try {
      const site = await Site.findByPk(req.params.siteId, {
        include: [{
          model: Drop,
          attributes: ['id', 'dropDate', 'cardsProcessed', 'source'],
          include: [{
            model: Batch,
            through: BatchDrop,
            attributes: ['submissionDate']
          }],
          order: [['dropDate', 'DESC']]
        }]
      });

      if (!site) {
        return res.status(404).json({ message: "Site not found" });
      }

      res.json(site);
    } catch (error) {
      console.error("Error fetching site with drops:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = postcardController;
