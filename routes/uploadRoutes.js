const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { uploadFile } = require("../controllers/upload");

const router = express.Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", upload.single("file"), uploadFile);

module.exports = router;
