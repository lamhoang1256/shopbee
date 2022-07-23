const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  bannerUrl: String,
});

module.exports = mongoose.model("Banner", bannerSchema);
