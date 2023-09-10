const express = require("express");
const TimeTrack = require("../../models/timeTrack");
const isAuthenticated = require("../../middlewares/isAuthenticated");
const sendResponse = require("../../utils/responseHandler");

const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);
    // Find today's entry
    const entry = await TimeTrack.findOne({
      userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (!entry || entry.timeOut) {
      return sendResponse(
        res,
        "Can't time out without a valid time in.",
        null,
        400
      );
    }

    entry.timeOut = new Date();

    // Calculate hours worked
    const diff = entry.timeOut - entry.timeIn;
    entry.hoursWorked = diff / (1000 * 60 * 60); // converting to hours

    await entry.save();
    sendResponse(res, "Timed Out successfully.", entry, 200);
  } catch (error) {
    console.error("Error timing out:", error);
    sendResponse(res, "Server error. Unable to time out.", null, 500);
  }
});

module.exports = router;
