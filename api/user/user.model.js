const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    fullname: String,
    avatar: String,
    phone: String,
    email: String,
    password: String,
    address: String,
    city: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
