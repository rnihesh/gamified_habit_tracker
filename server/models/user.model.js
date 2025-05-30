const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImageUrl: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    score: {
      type: Number,
      default: 0,
    },
    nScore: {
      type: Number,
      default: 0,
    },
    tasks: [
      {
        name: { type: String, required: true },
        count: { type: Number, default: 0 },
      },
    ],
    daily: [
      {
        name: { type: String, required: true },
        count: { type: Number, default: 0 },
      },
    ],
    rewards: {
      type: [String],
    },
    streak: {
      current: { type: Number, default: 0 },
      best: { type: Number, default: 0 },
      lastActiveDate: { type: Date, default: Date.now },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    strict: "throw",
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
