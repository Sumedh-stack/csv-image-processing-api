const Request = require("../models/Request");
const Product = require("../models/Product");

exports.getStatus = async (req, res) => {
  const request = await Request.findOne({ requestId: req.params.requestId });
  if (!request) return res.status(404).json({ error: "Request not found" });

  const products = await Product.find({ requestId: req.params.requestId });
  res.json({ status: request.status, products });
};
