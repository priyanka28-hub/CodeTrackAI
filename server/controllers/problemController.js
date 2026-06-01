const Problem = require("../models/Problem");
const Progress = require("../models/progress");

const addProblem = async (req, res) => {

  try {

    req.body.topic =
      req.body.topic.trim().toLowerCase();

    const existingProblem = await Problem.findOne({
      title: {
        $regex: `^${req.body.title.trim()}$`,
        $options: "i"
      },
      platform: {
        $regex: `^${req.body.platform.trim()}$`,
        $options: "i"
      }
    });

    if (existingProblem) {
      return res.status(400).json({
        message: "Problem already exists"
      });
    }

    const problem = await Problem.create(req.body);

    res.status(201).json(problem);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const getProblems = async (req, res) => {

  try {

    const problems = await Problem.find();

    res.status(200).json(problems);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const deleteProblem = async (req, res) => {

  try {

    await Progress.deleteMany({
      problem: req.params.id
    });

    await Problem.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Problem Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  addProblem,
  getProblems,
  deleteProblem
};