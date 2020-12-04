const { Router } = require("express");
const { createSubscription } = require("../utils/stripe");

const router = Router();

router.post("/create", async (req, res) => {
  const { priceId } = req.body;
  const response = await createSubscription({
    customer: req.user.customer.stripeId,
    payment: req.user.customer.defaultPaymentId,
    price: priceId,
  });
  res.send(response);
});

module.exports = router;
