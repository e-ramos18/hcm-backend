require("dotenv").config();
const mongoose = require("mongoose");
const TimeTrack = require("../models/timeTrack"); // adjust path as necessary

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
    process.exit(1);
  });

const userId = process.argv[2]; // get userId from command-line arguments

if (!userId) {
  console.error("Please provide a user ID.");
  process.exit(1);
}

async function seedTimeLogs() {
  const today = new Date();
  const logs = [];

  for (let i = 0; i < 30; i++) {
    const timeIn = new Date(today);
    timeIn.setDate(today.getDate() - i);
    timeIn.setHours(9, Math.floor(Math.random() * 60), 0);

    const timeOut = new Date(timeIn);
    timeOut.setHours(17, Math.floor(Math.random() * 60), 0);

    const hoursWorked = (timeOut - timeIn) / (1000 * 60 * 60); // in hours

    logs.push({
      userId,
      date: new Date(today.setDate(today.getDate() - i)),
      timeIn: timeIn,
      timeOut: timeOut,
      hoursWorked: hoursWorked,
    });
  }

  try {
    await TimeTrack.insertMany(logs);
    console.log("Data seeded successfully for user:", userId);
  } catch (error) {
    console.error("Error seeding data:", error);
  }

  mongoose.connection.close();
}

seedTimeLogs();
