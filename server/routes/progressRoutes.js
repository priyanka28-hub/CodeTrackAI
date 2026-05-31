const express = require("express");

const router = express.Router();

const {
  addProgress
} = require("../controllers/progressController");

router.post("/", addProgress);

module.exports = router;