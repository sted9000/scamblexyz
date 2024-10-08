const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const checkinController = require("../controllers/checkinController");

router.get("/", authenticateToken, checkinController.getCheckins);
router.put("/", authenticateToken, checkinController.updateCheckin);

module.exports = router;
