const { Router } = require("express");
const passport = require("passport");

const router = Router();

router.get("/status", (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

// /api/auth/discord
router.get("/discord", passport.authenticate("discord"));

// /api/auth/discord/redirect
router.get(
  "/discord/redirect",
  passport.authenticate("discord"),
  (req, res) => {
    res.redirect("http://localhost:3000/payment");
  }
);

module.exports = router;
