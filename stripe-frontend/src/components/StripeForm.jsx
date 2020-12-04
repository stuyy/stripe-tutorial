import React from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { sendPaymentMethod } from "../utils/api";

export const StripeForm = () => {
  const [error, setError] = React.useState();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement("card");
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      card,
      type: "card",
    });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log(paymentMethod);
      sendPaymentMethod({ id: paymentMethod.id })
        .then(({ data }) => console.log(data))
        .catch((err) => console.log(err));
    }
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <div>
      {error ? <div>{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};
