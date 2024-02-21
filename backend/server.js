const express = require("express");
require("dotenv").config();
const usersRouter = require("./routes/usersRouter");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT || 5000;

//----middleware----
app.use(express.json()); //pas incoming json data
//-----Routes-----
app.use("/api/v1/users", usersRouter);

//--error handler middleware---
app.use(errorHandler);
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
