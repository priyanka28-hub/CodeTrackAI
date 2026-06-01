const Progress = require("../models/progress");

const addProgress = async (req, res) => {

  try {

    const { user, problem } = req.body;

    const existingProgress =
      await Progress.findOne({
        user,
        problem
      });

    if (existingProgress) {
      return res.status(400).json({
        message: "Problem already marked as solved"
      });
    }

    const progress = await Progress.create(req.body);

    res.status(201).json(progress);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  addProgress
};