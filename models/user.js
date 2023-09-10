const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      // This should be a hashed password
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
