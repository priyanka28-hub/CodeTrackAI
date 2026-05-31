const Progress = require("../models/progress");

const addProgress = async (req, res) => {
  try {

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