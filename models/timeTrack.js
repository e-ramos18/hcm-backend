const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const timeTrackSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    timeIn: {
      type: Date,
      required: true,
      default: Date.now,
    },
    timeOut: Date,
    hoursWorked: Number,
  },
  {
    timestamps: true,
  }
);

// Middleware to calculate hoursWorked
timeTrackSchema.pre("save", function (next) {
  if (this.timeIn && this.timeOut) {
    const diff = this.timeOut - this.timeIn; // This gives difference in milliseconds
    this.hoursWorked = diff / (1000 * 60 * 60); // Convert milliseconds to hours
  }
  next();
});

const TimeTrack = mongoose.model("TimeTrack", timeTrackSchema);
module.exports = TimeTrack;
