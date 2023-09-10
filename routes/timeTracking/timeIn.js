const express = require("express");
const TimeTrack = require("../../models/timeTrack");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const sendResponse = require("../../utils/responseHandler");

const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;

    const existingEntry = await TimeTrack.findOne({
      userId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999),
      },
    });

    if (existingEntry) {
      return sendResponse(
        res,
        "You've already timed in for the day.",
        null,
        400
      );
    }

    const newTimeLog = new TimeTrack({
      userId: userId,
      timeIn: new Date(),
    });

    const savedTimeLog = await newTimeLog.save();
    sendResponse(res, "Timed In successfully.", savedTimeLog, 200);
  } catch (error) {
    console.error("Error timing in:", error);
    sendResponse(res, "Server error.", null, 500);
  }
});

module.exports = router;
