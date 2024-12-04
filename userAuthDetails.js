const mongoose = require("mongoose");

const UserAuthDetailsSchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  isAuthenticated: { type: Boolean, default: false },
  userId: { type: String, required: false, default: "" },
  username: {type: String, required: false, default: "" },
});

module.exports = mongoose.model("UserAuthDetails", UserAuthDetailsSchema);
