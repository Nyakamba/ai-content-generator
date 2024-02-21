const express = require("express");
const usersRouter = require("./routes/usersRouter");
require("./utils/connectDB")();

const app = express();
const PORT = process.env.PORT || 5000;

//----middleware----
app.use(express.json()); //pas incoming json data
//-----Routes-----
app.use("/api/v1/users", usersRouter);

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
