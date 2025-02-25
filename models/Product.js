const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  requestId: String,
  productName: String,
  inputImages: [String],
  outputImages: [String],
});

module.exports = mongoose.model("Product", productSchema);
