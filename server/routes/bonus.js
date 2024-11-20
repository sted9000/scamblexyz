const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const bonusController = require("../controllers/bonusController");

router.get("/", authenticateToken, bonusController.getBonus);
router.post("/", authenticateToken, bonusController.createBonus);
router.put("/:id", authenticateToken, bonusController.updateBonus);
router.delete("/:id", authenticateToken, bonusController.deleteBonus);
module.exports = router;
