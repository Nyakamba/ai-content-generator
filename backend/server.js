const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const openAIRouter = require("./routes/openAIRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT || 5000;

//----middleware----
app.use(express.json()); //pas incoming json data
app.use(cookieParser()); //pass the cookie automaticallly
//-----Routes-----
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/openai", openAIRouter);

//--error handler middleware---
app.use(errorHandler);
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
