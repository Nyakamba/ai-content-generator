const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const checkApiRquestLimit = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  console.log(req.user);
  //find user
  const user = await User.findById(req?.user?.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  let requestLimit = 0;
  //check if user is in trial period
  if (user?.isTrialActive) {
    requestLimit = user?.monthlyRequestCount;
  }
  //check ifg user has exceeded mothly request
  if (user?.apiRequestCount >= requestLimit) {
    throw new Error("API Request limit reached");
  }
  next();
});

module.exports = checkApiRquestLimit;
