const asyncHandler = require("express-async-handler");
const calculateNextBillingDate = require("../utils/calculateNextBillingDate");
const shouldRenewSubscriptionPlan = require("../utils/shouldRenewSubscriptionPlan");
const Payment = require("../models/Payment");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//--------Stripe payment-------

const handleStripePayment = asyncHandler(async (req, res) => {
  const { amount, subscriptionPlan } = req.body;
  //get the user
  const user = req?.user;
  //console.log(user);
  try {
    //create payment intent

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: "usd",
      //add some data to the meta object
      metadata: {
        userId: user?._id?.toString(),
        userEmail: user?.email,
        subscriptionPlan,
      },
    });

    //send the response
    res.json({
      clientSecret: paymentIntent?.client_secret,
      paymentId: paymentIntent?.id,
      metadata: paymentIntent?.metadata,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//--------Handle free payment-------
const handleFreeSubscription = asyncHandler(async (req, res) => {
  //Get the login user
  const user = req?.user;
  console.log(user);

  //check if user account should be renewed or not
  try {
    if (shouldRenewSubscriptionPlan(user)) {
      //update the user account
      user.subscriptionPlan = "Free";
      user.monthlyRequestCount = 5;
      user.apiRequestCount = 0;
      user.nextBillingDate = calculateNextBillingDate();
      //create new payment and save into DB
      const newPayment = await Payment.create({
        user: user?._id,
        subscriptionPlan: "Free",
        amount: 0,
        status: "success",
        currency: "usd",
        reference: Math.random().toString(36).substring(7),
      });
      user.payments.push(newPayment?._id);
      //save the user
      await user.save();
      //send the response
      res.json({
        status: "success",
        message: "Subscription plan updated successfully",
        user,
      });
    } else {
      return res.status(403).json({ error: "Subscription not due yet" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = { handleStripePayment, handleFreeSubscription };
