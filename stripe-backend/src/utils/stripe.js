const { Stripe } = require("stripe");
const User = require("../database/models/User");

const stripe = new Stripe(process.env.STRIPE_KEY, { apiVersion: "2020-08-27" });

const createStripeCustomer = async ({ email }) => {
  const { data } = await stripe.customers.list({ email });
  return data.length === 0 ? stripe.customers.create({ email }) : data[0];
};

const attachPaymentMethod = async ({ customer, id }) =>
  stripe.paymentMethods.attach(id, {
    customer,
  });

const createSubscription = ({ customer, payment, price }) => {
  return stripe.subscriptions.create({
    items: [
      {
        price,
      },
    ],
    customer,
    default_payment_method: payment,
  });
};

module.exports = {
  createStripeCustomer,
  attachPaymentMethod,
  createSubscription,
};
