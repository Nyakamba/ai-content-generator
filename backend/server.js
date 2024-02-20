const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
