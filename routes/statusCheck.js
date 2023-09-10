const express = require("express");
const router = express.Router();
const sendResponse = require("../utils/responseHandler");

router.get("/test", (req, res) => {
  sendResponse(res, "Backend is working!", null, 200);
});

module.exports = router;
