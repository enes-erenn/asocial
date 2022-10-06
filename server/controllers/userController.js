const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Checking the username
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        message: "There is already a user with the same username",
        status: "fail",
      });
    }

    // Checking the email
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({
        message: "There is already a user with the same email",
        status: "fail",
      });
    }

    // Crypting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating the user
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return res.json({
      message: "User has been created successfully.",
      status: "success",
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.json({
      message: "Something went wrong...",
      error: err.message,
      status: "fail",
    });
  }
};
