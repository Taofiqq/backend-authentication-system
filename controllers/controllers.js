const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleErrors = (err) => {
  //   console.log(err.code, err.message);
  let error = { firstName: "", lastName: "", email: "", password: "" };

  if (err.code === 11000) {
    error.email = "Email already exists";
    return error;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).map(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    // console.log(error.code);
    const errors = handleErrors(error);
    res.status(400).json({
      message: "User creation failed",
      errors,
    });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect password",
        });
      } else {
        return res.status(200).json({
          message: "User logged in successfully",
          user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

module.exports.get_users = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "SUCCESS",
    message: "Users retrieved successfully",
    users,
  });
};
