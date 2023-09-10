require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./database");
const authRoutes = require("./routes/auth");
const timeTrackingRoutes = require("./routes/timeTracking");
const statusCheckRoute = require("./routes/statusCheck");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json()); // Body parser (for JSON payloads), before routes
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Routes
app.use(statusCheckRoute);
app.use("/auth", authRoutes);
app.use("/time", timeTrackingRoutes);

module.exports = app;
