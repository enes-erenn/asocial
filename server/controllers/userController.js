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
        _id: user._id,
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

module.exports.login = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    let user;

    // Checking the user
    const usernameCheck = await User.findOne({ username: usernameOrEmail });
    const emailCheck = await User.findOne({ email: usernameOrEmail });

    if (usernameCheck) {
      user = usernameCheck;
    }

    if (emailCheck) {
      user = emailCheck;
    }

    if (!usernameCheck && !emailCheck) {
      return res.json({
        message: "User not found.",
        status: "fail",
      });
    }

    // Validating the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({
        message: "Invalid password.",
        status: "fail",
      });
    }

    return res.json({
      status: "success",
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
        avatarImageURL: user.avatarImageURL,
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

module.exports.avatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const image = req.body.image;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatarImageURL: image,
      },
      { returnOriginal: false }
    );

    return res.json({
      status: "success",
      message: "User avatar updated successfully",
      user,
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

module.exports.contacts = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: { $ne: req.params.id },
    }).select(["email", "username", "avatarImageURL", "_id"]);

    return res.json({
      status: "success",
      users,
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
