const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuthenticated = require("../middlewares/isAuthenticated");

// Registration
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  //Validate
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please all fields are required");
  }
  //check the email if it is taken
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  //hash passowrd
  const salt = await bcrypt.genSalt(10);
  const hashedPasword = await bcrypt.hash(password, salt);

  //register user
  const newUser = new User({
    username,
    email,
    password: hashedPasword,
  });
  //Add the date the trial will end
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );
  //save the user
  await newUser.save();

  res.json({
    status: true,
    message: "Registration  was successful",
    user: {
      username,
      email,
    },
  });
});

//Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
  //check if password is valid
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid login credentials");
  }
  //Generate token (jwt)

  const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  //set the token into cookie(http only)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  //send the response
  res.json({
    status: "success",
    message: "Login success",
    _id: user?._id,
    username: user?.username,
    email: user?.email,
  });
});
//Logout
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.status(200).json({ message: "Logged out successfully" });
});

//Profile
const userProfile = asyncHandler(async (req, res) => {
  const id = req?.user?.id;
  const user = await User.findById(id)
    .select("-password")
    .populate("payments")
    .populate("contentHistory");

  if (user) {
    res.status(200).json({
      status: "success",
      user,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Check user Auth Status
const checkAuth = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  if (decoded) {
    res.json({
      isAuthenticated: true,
    });
  } else {
    res.json({
      isAuthenticated: false,
    });
  }
});

module.exports = { register, login, logout, userProfile, checkAuth };
