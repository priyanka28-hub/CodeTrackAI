import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
  "token",
  res.data.token
);

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-white text-center mb-2">
          🚀 CodeTrack AI
        </h1>

        <p className="text-slate-400 text-center mb-8">
          DSA Progress & Analytics Platform
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="text-slate-300 block mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-slate-300 block mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;