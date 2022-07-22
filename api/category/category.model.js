const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  thumb: String,
});

module.exports = mongoose.model("Category", categorySchema);
