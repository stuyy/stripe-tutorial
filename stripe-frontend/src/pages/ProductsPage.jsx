import React from "react";
import { createSubscription } from "../utils/api";

export const ProductsPage = () => {
  const [fetching, setFetching] = React.useState(false);
  const priceIds = {
    monthly: "PRICE ID",
    yearly: "PRICE ID",
  };
  const handleSubscribeMonthly = async () => {
    setFetching(true);
    const { data } = await createSubscription({ priceId: priceIds.monthly });
    setFetching(false);
    console.log(data);
  };
  const handleSubscribeYearly = async () => {
    setFetching(true);
    const { data } = await createSubscription({ priceId: priceIds.yearly });
    setFetching(false);
    console.log(data);
  };
  return (
    <div>
      {fetching ? <h1>Subscribing....</h1> : null}
      <button onClick={handleSubscribeMonthly} disabled={fetching}>
        Subscribe to Tier 1 for $4.99/mo
      </button>
      <button onClick={handleSubscribeYearly} disabled={fetching}>
        Subscribe to Tier 1 for $49.99/yr
      </button>
    </div>
  );
};
