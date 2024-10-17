const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const bonusController = require("../controllers/bonusController");

router.get("/user", authenticateToken, bonusController.getUserBonuses);
router.post("/", authenticateToken, bonusController.createBonus);
router.put("/:id", authenticateToken, bonusController.updateBonus);
module.exports = router;
