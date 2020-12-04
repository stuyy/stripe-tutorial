const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  stripeId: {
    type: String,
    required: true,
  },
  subscriptionId: {
    type: String,
    required: false,
  },
  subscribedDate: {
    type: Date,
    required: false,
  },
  defaultPaymentId: {
    type: String,
    required: false,
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  customer: {
    type: CustomerSchema,
    default: null,
    required: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
