const { Router } = require("express");
const authRoutes = require("./auth");
const paymentsRoutes = require("./payments");
const subscriptionRoutes = require("./subscriptions");
const router = Router();

router.use("/auth", authRoutes);
router.use("/payments", paymentsRoutes);
router.use("/subscriptions", subscriptionRoutes);

module.exports = router;
