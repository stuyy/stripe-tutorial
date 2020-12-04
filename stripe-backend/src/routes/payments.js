const { Router } = require("express");
const User = require("../database/models/User");
const { attachPaymentMethod } = require("../utils/stripe");

const router = Router();

router.post("/methods/create", async (req, res) => {
  if (req.user) {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);
    const { customer } = req.user;
    const result = await attachPaymentMethod({
      customer: customer.stripeId,
      id,
    });
    const update = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        $set: { "customer.defaultPaymentId": result.id },
      },
      {
        new: true,
      }
    );
    return res.send(update);
  } else return res.sendStatus(401);
});

module.exports = router;
