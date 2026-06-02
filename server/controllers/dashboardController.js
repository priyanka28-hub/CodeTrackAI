const Progress = require("../models/Progress");
const Problem = require("../models/Problem");

const getDashboard = async (req, res) => {
  try {

    const userId = req.params.userId;

    const solvedProblems = await Progress.find({
      user: userId,
      status: "Solved"
    }).populate("problem");

    const totalSolved = solvedProblems.length;

    let easySolved = 0;
    let mediumSolved = 0;
    let hardSolved = 0;

    let topicStats = {};

    solvedProblems.forEach((item) => {

  if (!item.problem) return;

  if (item.problem.difficulty === "Easy")
    easySolved++;

  else if (item.problem.difficulty === "Medium")
    mediumSolved++;

  else if (item.problem.difficulty === "Hard")
    hardSolved++;

  const topic = item.problem.topic;

  if (topicStats[topic]) {
    topicStats[topic]++;
  } else {
    topicStats[topic] = 1;
  }

});

    res.json({
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved,
  topicStats
});

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = {
  getDashboard
};