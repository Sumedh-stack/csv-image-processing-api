const express = require("express");
const { getStatus } = require("../controllers/request");

const router = express.Router();

router.get("/:requestId", getStatus);

module.exports = router;
