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
  "/site/:siteId",
  authenticateToken,
  userController.updateEnabledSite
);

router.put(
  "/profile",
  authenticateToken,
  userController.updateProfile
);

module.exports = router;
