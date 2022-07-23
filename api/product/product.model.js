const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  images: [String],
  description: String,
  category: { type: mongoose.SchemaTypes.ObjectId, ref: "category" },
  price: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  salePrice: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  view: { type: Number, default: 0 },
});

module.exports = mongoose.model("Product", productSchema);
