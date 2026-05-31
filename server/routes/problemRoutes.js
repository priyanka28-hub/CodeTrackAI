const express = require("express");

const router = express.Router();

const {
addProblem
} = require("../controllers/problemController");

router.post("/",addProblem);

module.exports = router;