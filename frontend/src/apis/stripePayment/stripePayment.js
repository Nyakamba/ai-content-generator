import axios from "axios";
//stripe payment
export const handleFreeSubscriptionAPI = async () => {
  const response = await axios.post(
    "https://ai-content-generator.onrender.com/api/v1/stripe/free-plan",
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//stripe payment intent
export const createStripePaymentIntentAPI = async (payment) => {
  const response = await axios.post(
    "https://ai-content-generator.onrender.com/api/v1/stripe/checkout",
    {
      amount: payment?.amount,
      subscriptionPlan: payment?.plan,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};

//verify payment intent
export const verifyPaymentAPI = async (paymentId) => {
  const response = await axios.post(
    `https://ai-content-generator.onrender.com/api/v1/stripe/verify-payment/${paymentId}`,
    {},
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
