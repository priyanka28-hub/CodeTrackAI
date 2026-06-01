import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Dashboard() {

  const [data, setData] = useState(null);
  const chartData = {
  labels: ["Easy", "Medium", "Hard"],
  datasets: [
    {
      data: [
        data?.easySolved || 0,
        data?.mediumSolved || 0,
        data?.hardSolved || 0
      ],
      backgroundColor: [
        "#22c55e",
        "#facc15",
        "#ef4444"
      ]
    }
  ]
};

  const topicChartData = {
  labels: Object.keys(data?.topicStats || {}),
  datasets: [
    {
      label: "Problems Solved",
      data: Object.values(data?.topicStats || []),
      backgroundColor: "#3b82f6",
      borderColor: "#60a5fa",
      borderWidth: 1
    }
  ]
};

  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const userId =
  localStorage.getItem("userId");

const res = await API.get(
  `/dashboard/${userId}`
);

        setData(res.data);

      } catch (error) {

        console.log(error);

      }

    };

    fetchDashboard();

  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        📊 CodeTrack Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Total Solved
          </h2>

          <p className="text-4xl font-bold">
            {data.totalSolved}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Easy
          </h2>

          <p className="text-4xl font-bold text-green-400">
            {data.easySolved}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Medium
          </h2>

          <p className="text-4xl font-bold text-yellow-400">
            {data.mediumSolved}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl">
          <h2 className="text-slate-400">
            Hard
          </h2>

          <p className="text-4xl font-bold text-red-400">
            {data.hardSolved}
          </p>
        </div>

      </div>
      <div className="bg-slate-900 p-6 rounded-xl mt-8">

  <h2 className="text-2xl font-bold mb-4">
    Difficulty Distribution
  </h2>

  <div className="max-w-md mx-auto">
    <Pie data={chartData} />
  </div>

</div>
      
      <div className="bg-slate-900 p-6 rounded-xl mt-8">
        <div className="bg-slate-900 p-6 rounded-xl mt-8">

  <h2 className="text-2xl font-bold mb-4">
    📈 Topic Distribution
  </h2>

  <div className="h-80">
  <Bar
    data={topicChartData}
    options={{
      maintainAspectRatio: false
    }}
  />
</div>

</div>
        <h2 className="text-2xl font-bold mb-4">
          Topic Analytics
        </h2>

        {Object.entries(data.topicStats).map(
          ([topic, count]) => (
            <div
              key={topic}
              className="flex justify-between py-2"
            >
              <span>{topic}</span>
              <span>{count}</span>
            </div>
          )
        )}

      </div>

    </div>
    </>
  );
}

export default Dashboard;