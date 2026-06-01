import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function AddProblem() {

  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("LeetCode");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !topic) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post(
        "/problems",
        {
          title,
          platform,
          difficulty,
          topic
        }
      );

      alert("Problem Added Successfully");

      setTitle("");
      setPlatform("LeetCode");
      setDifficulty("Easy");
      setTopic("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to add problem"
      );

    }
  };

  return (
    <>
       <Navbar />
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          ➕ Add Problem
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

     <div>
            <label className="text-slate-300 block mb-2">
              Problem Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter problem title"
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-2">
              Difficulty
            </label>

            <div>
               <label className="text-slate-300 block mb-2">
                 Platform
            </label>

            <select
               value={platform}
               onChange={(e) => setPlatform(e.target.value)}
               className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            >
              <option>LeetCode</option>
              <option>CodeChef</option>
              <option>Codeforces</option>
              <option>HackerRank</option>
         </select>
     </div>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="text-slate-300 block mb-2">
              Topic
            </label>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Arrays, Strings, DP..."
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-semibold"
          >
            Add Problem
          </button>

        </form>

      </div>

    </div>
    </>
  );
}

export default AddProblem;