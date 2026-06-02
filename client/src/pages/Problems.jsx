import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Problems() {
  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const markSolved = async (problemId) => {
    try {
      await API.post("/progress", {
        user: localStorage.getItem("userId"),
        problem: problemId,
        status: "Solved",
        solvedDate: new Date()
      });

      alert("Problem Marked as Solved");

      navigate("/dashboard");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to mark problem"
      );
    }
  };

  const deleteProblem = async (problemId) => {
    try {
      await API.delete(`/problems/${problemId}`);

      setProblems(
        problems.filter(
          (problem) => problem._id !== problemId
        )
      );

      alert("Problem Deleted");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await API.get("/problems");
        setProblems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <h1 className="text-4xl font-bold mb-8">
          📚 Problems
        </h1>

        <input
          type="text"
          placeholder="Search problems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white border border-slate-700"
        />

        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white border border-slate-700"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <div className="grid gap-4">
          {problems
            .filter((problem) => {
              const matchesSearch =
                problem.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                problem.platform
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                problem.topic
                  .toLowerCase()
                  .includes(search.toLowerCase());

              const matchesDifficulty =
                difficultyFilter === "All" ||
                problem.difficulty === difficultyFilter;

              return matchesSearch && matchesDifficulty;
            })
            .map((problem) => (
              <div
                key={problem._id}
                className="bg-slate-900 p-5 rounded-xl"
              >
                <h2 className="text-xl font-bold">
                  {problem.title}
                </h2>

                <p className="text-slate-400">
                  Platform: {problem.platform}
                </p>

                <p>
                  Difficulty: {problem.difficulty}
                </p>

                <p>
                  Topic: {problem.topic}
                </p>

                <button
                  onClick={() =>
                    markSolved(problem._id)
                  }
                  className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  Mark as Solved
                </button>

                <button
                  onClick={() =>
                    deleteProblem(problem._id)
                  }
                  className="mt-3 ml-3 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Problems;