const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { User, UserSites, Site } = require("../models");
const createCheckinsForUser = require("../utils/createCheckins");
const {
  randomUsername,
  randomUserIcon,
} = require("../utils/randomUserProperties");

const router = express.Router();

router.post("/google", async (req, res) => {
  const { code } = req.body;
  const oAuth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: "http://localhost:8080/auth/google/",
  });

  try {
    const { tokens } = await oAuth2Client.getToken({
      code: code,
    });
    oAuth2Client.setCredentials(tokens);

    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload["sub"];
    const email = payload["email"];

    let user = await User.findOne({ where: { googleId } });

    if (!user) {
      const username = randomUsername();
      const userIcon = randomUserIcon();
      user = await User.create({ googleId, email, username, userIcon });

      // Create checkins for the user
      try {
        await createCheckinsForUser(user.id);
      } catch (error) {
        console.error("Error creating checkins for user:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      // Create userSites for the user
      try {
        const sites = await Site.findAll();
        for (const site of sites) {
          await UserSites.create({ userId: user.id, siteId: site.id });
        }
      } catch (error) {
        console.error("Error creating userSites for user:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username, userIcon: user.userIcon, createdAt: user.createdAt },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user.id, email: user.email });
  } catch (error) {
    console.error("Error processing Google sign-in:", error);
    res.status(400).json({ error: "Invalid authorization code" });
  }
});

module.exports = router;
