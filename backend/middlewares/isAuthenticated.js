const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//isAuthenticated middleware
const isAuthenticated = asyncHandler(async (req, res, next) => {
  if (req.cookies.token) {
    //!verify token
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

    console.log(decoded);
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

module.exports = isAuthenticated;
