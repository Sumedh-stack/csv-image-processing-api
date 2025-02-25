
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const uploadRoutes = require("./routes/uploadRoutes");
const requestRoutes = require("./routes/requestRoutes");

const MONGO_URI  = process.env.MONGO_URI;

const port = process.env.PORT || 3000 ;
const app = express();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "uploads")));

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/upload", uploadRoutes);
app.use("/status", requestRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));



