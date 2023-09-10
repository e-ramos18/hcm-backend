const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/responseHandler"); // Ensure the correct path to your sendResponse utility

function isAuthenticated(req, res, next) {
  const token = req.cookies.token;
  console.log({ token });

  if (!token) {
    return sendResponse(res, "Access denied. No token provided.", null, 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    sendResponse(res, "Invalid token.", null, 400);
  }
}

module.exports = isAuthenticated;
