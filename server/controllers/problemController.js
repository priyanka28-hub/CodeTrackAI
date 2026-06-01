const Problem = require("../models/Problem");

const addProblem = async (req, res) => {

  try {

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

module.exports = {
  addProblem,
  getProblems
};