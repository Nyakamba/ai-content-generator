const asyncHandler = require("express-async-handler");
const stripe = require("stripe");

//--------Stripe payment-------

const handleStripePayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  //get the user
  const user = req?.user;
  try {
  } catch (error) {}
});
