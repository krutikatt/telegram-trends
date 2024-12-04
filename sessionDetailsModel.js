const mongoose = require("mongoose");

const sessionDetSchema = new mongoose.Schema({
  browserName: String,
  browserVersion: String,
  userAgent: String,
  platform: String,
  language: String,
  screenResolution: String,
  availableScreen: String,
  timezone: String,
  ipAddress: String,
  clickData: [
    {
      x: Number,
      y: Number,
    },
  ],
  timeSpent: Number,
});

module.exports = mongoose.model("sessionDetails", sessionDetSchema);
