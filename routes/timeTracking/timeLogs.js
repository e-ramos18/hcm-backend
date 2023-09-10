const express = require("express");
const router = express.Router();
const TimeTrack = require("../../models/timeTrack");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const sendResponse = require("../../utils/responseHandler");

router.get("/latest/:userId", isAuthenticated, async (req, res) => {
  const { userId } = req.params;

  try {
    const latestLog = await TimeTrack.findOne({ userId: userId })
      .sort({ date: -1 })
      .exec();

    if (!latestLog) {
      return sendResponse(res, "No time logs found for this user", null, 404);
    }

    sendResponse(res, "Latest time log fetched successfully", latestLog);
  } catch (err) {
    sendResponse(res, "Failed to fetch latest time log", null, 500);
  }
});

// New route to fetch all time logs for the authenticated user
router.get("/currentUser", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id; // Assuming your authentication middleware attaches the user object to the request
    const logs = await TimeTrack.find({ userId });

    sendResponse(res, "Fetched logs successfully", logs);
  } catch (error) {
    sendResponse(res, error.message, null, 500);
  }
});

module.exports = router;
