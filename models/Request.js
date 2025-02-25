const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: String,
  status: { type: String, default: "pending" },
  products: Array,
  webhookUrl: String,
});

module.exports = mongoose.model("Request", requestSchema);