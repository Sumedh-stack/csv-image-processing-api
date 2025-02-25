const axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/Product");
const Request = require("../models/Request");
require("dotenv").config();
const port = process.env.PORT || 3000 ;


async function processImages(requestId, products, webhookUrl) {
  for (let product of products) {
    if (!product["Input Image Urls"]) {
      console.error(`Skipping product ${product["Product Name"]}: Missing Input Image Urls`);
      continue;
    }
    const outputImages = [];
    for (let url of product["Input Image Urls"].split(",")) {
      try {
        const response = await axios({ url: url.trim(), responseType: "arraybuffer" });
        const compressedBuffer = await sharp(response.data).jpeg({ quality: 50 }).toBuffer();
        const filename = `${uuidv4()}.jpg`;
        const filepath = path.join(__dirname, "../uploads", filename);
        fs.writeFileSync(filepath, compressedBuffer);
        outputImages.push(`http://localhost:${port}/images/${filename}`);
      } catch (error) {
        console.error("Image processing error", error);
      }
    }
    await Product.create({
      requestId,
      productName: product["Product Name"],
      inputImages: product["Input Image Urls"].split(","),
      outputImages,
    });
  }
  await Request.findOneAndUpdate({ requestId }, { status: "completed" });
  if (webhookUrl) axios.post(webhookUrl, { requestId, status: "completed" });
}

module.exports = processImages;