const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const router = express.Router();
const userController = require("../controllers/userController");

router.get(
  "/sites",
  authenticateToken,
  userController.getSites
);

router.post(
  "/sites",
  authenticateToken,
  userController.updateEnabledSites
);

router.put(
  "/profile",
  authenticateToken,
  userController.updateProfile
);

module.exports = router;
