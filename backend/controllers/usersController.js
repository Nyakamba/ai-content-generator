const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Registration
const register = async (req, res) => {
  try {
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
  } catch (error) {
    throw new Error(error);
  }
};
//Login
//Logout
//Profile
//Check user Auth Status

module.exports = { register };
