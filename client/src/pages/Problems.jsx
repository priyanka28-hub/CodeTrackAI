import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Problems() {

  const [problems, setProblems] = useState([]);

  const markSolved = async (problemId) => {

  try {

    await API.post(
      "/progress",
      {
        user: localStorage.getItem("userId"),
        problem: problemId,
        status: "Solved",
        solvedDate: new Date()
      }
    );

    alert("Problem Marked as Solved");

    window.location.href = "/dashboard";

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to mark problem"
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

      <div className="grid gap-4">

        {problems.map((problem) => (

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
      onClick={() => markSolved(problem._id)}
      className="mt-3 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
    >
      Mark as Solved
    </button>

  </div>

))}

      </div>

    </div>
    </>
  );
}

export default Problems;