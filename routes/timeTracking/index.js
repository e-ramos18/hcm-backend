const express = require("express");
const router = express.Router();

const timeInRoute = require("./timeIn");
const timeOutRoute = require("./timeOut");
const timeLogsRoute = require("./timeLogs");

router.use("/in", timeInRoute);
router.use("/out", timeOutRoute);
router.use("/logs", timeLogsRoute);

module.exports = router;
