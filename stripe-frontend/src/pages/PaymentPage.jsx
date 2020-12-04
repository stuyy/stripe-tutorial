import React from "react";
import { StripeForm } from "../components";
import { getAuthStatus } from "../utils/api";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripe = loadStripe(
  "PLACE YOUR STRIPE PUBLISHABLE KEY HERE, NOT THE SECRET!"
);

export const PaymentPage = ({ history }) => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getAuthStatus()
      .then(({ data }) => {
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        history.push("/login");
        setLoading(false);
      });
  });

  return !loading ? (
    <div>
      <h1>Payment</h1>
      <Elements stripe={stripe}>
        <StripeForm />
      </Elements>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};
