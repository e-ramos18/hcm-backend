const express = require("express");
const router = express.Router();

const signupRoute = require("./signup");
const loginRoute = require("./login");
const logoutRoute = require("./logout");

router.use("/signup", signupRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

module.exports = router;
