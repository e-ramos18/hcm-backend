const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const sendResponse = require("../../utils/responseHandler");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return sendResponse(res, "Username already exists", null, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  try {
    await user.save();
    sendResponse(res, "User registered successfully", null, 201);
  } catch (error) {
    sendResponse(res, "Server error", null, 500);
  }
});

module.exports = router;
