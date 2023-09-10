const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const sendResponse = require("../../utils/responseHandler");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return sendResponse(res, "User not found", null, 400);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return sendResponse(res, "Invalid credentials", null, 400);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 3600000,
  });

  // Prepare the user data to send
  const userToSend = {
    id: user._id,
    username: user.username,
    token,
  };

  sendResponse(res, "Logged in successfully", userToSend, 200);
});

module.exports = router;
