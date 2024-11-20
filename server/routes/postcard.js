const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const postcardController = require("../controllers/postcardController");

router.get("/drop", authenticateToken, postcardController.getDrops);
router.get("/batch", authenticateToken, postcardController.getBatch);
router.post("/batch", authenticateToken, postcardController.addBatch);
router.post("/drop/:batchId", authenticateToken, postcardController.addDrop);
router.delete("/drop/:dropId", authenticateToken, postcardController.deleteDrop);
router.put("/batch/:id", authenticateToken, postcardController.updateBatch);
router.get("/site/:siteId", authenticateToken, postcardController.getSite);

module.exports = router;
