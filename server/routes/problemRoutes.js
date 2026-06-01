const express = require("express");

const router = express.Router();

const {
  addProblem,
  getProblems
} = require("../controllers/problemController");

router.post("/", addProblem);

router.get("/", getProblems);

module.exports = router;