const express = require("express");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const cors = require("cors");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const openAIRouter = require("./routes/openAIRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
const stripeRouter = require("./routes/stripeRouter");
const User = require("./models/User");
require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT || 5000;

//Cron for the trial period : run every single day
cron.schedule(" 0 0 * * * * ", async () => {
  try {
    //get the current date
    const today = new Date();
    await User.updateMany(
      {
        trialActive: true,
        trialExpires: { $lt: today },
      },
      {
        trialActive: false,
        subscriptionPlan: "Free",
        monthlyRequestCount: 5,
      }
    );
  } catch (error) {
    console.log(error);
  }
});
//Cron for free  plan : run at ht end of of every month
cron.schedule("0 0 1 * * *", async () => {
  try {
    //get the current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Free",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//Cron for basic  plan : run at ht end of of every month
cron.schedule("0 0 1 * * *", async () => {
  try {
    //get the current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Basic",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});
//Cron for premium  plan : run at ht end of of every month
cron.schedule("0 0 1 * * *", async () => {
  try {
    //get the current date
    const today = new Date();
    await User.updateMany(
      {
        subscriptionPlan: "Premium",
        nextBillingDate: { $lt: today },
      },
      {
        monthlyRequestCount: 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
});
//----middleware----
app.use(express.json()); //pas incoming json data
app.use(cookieParser()); //pass the cookie automaticallly
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
//-----Routes-----
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);
app.use("/api/v1/stripe", stripeRouter);

//--error handler middleware---
app.use(errorHandler);
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
