const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const timeTrackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  timeIn: { type: Date },
  timeOut: { type: Date },
  hoursWorked: { type: Number },
});

const User = mongoose.model("User", userSchema);
const TimeTrack = mongoose.model("TimeTrack", timeTrackSchema);

module.exports = { User, TimeTrack };
