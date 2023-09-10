const express = require("express");
const router = express.Router();
const sendResponse = require("../../utils/responseHandler"); // Import the response handler

router.post("/", (req, res) => {
  res.clearCookie("token");
  sendResponse(res, "Logged out successfully", null, 200); // Use the utility function
});

module.exports = router;
