import axios from "axios";

const CREDENTIALS = {
  withCredentials: true,
};

export const getAuthStatus = () =>
  axios.get("http://localhost:3001/api/auth/status", CREDENTIALS);

export const sendPaymentMethod = (data) =>
  axios.post(
    "http://localhost:3001/api/payments/methods/create",
    data,
    CREDENTIALS
  );

export const createSubscription = (data) =>
  axios.post(
    "http://localhost:3001/api/subscriptions/create",
    data,
    CREDENTIALS
  );
