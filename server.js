require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./database");
const statusCheckRoute = require("./routes/statusCheck");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(express.json()); // Body parser (for JSON payloads), before routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Use cookie parser
app.use(cookieParser());

// Routes
app.use(statusCheckRoute);

module.exports = app;
