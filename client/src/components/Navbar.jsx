import { Link } from "react-router-dom";

function Navbar() {

  const userName =
    localStorage.getItem("userName");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    window.location.href = "/";
  };

  return (
    <nav className="bg-slate-900 text-white p-4 flex justify-between items-center">

      <h1 className="text-2xl font-bold">
        🚀 CodeTrack AI
      </h1>

      <div className="flex gap-6 items-center">

        <Link
          to="/dashboard"
          className="hover:text-blue-400"
        >
          Dashboard
        </Link>

        <Link
          to="/problems"
          className="hover:text-blue-400"
        >
          Problems
        </Link>

        <Link
          to="/add-problem"
          className="hover:text-blue-400"
        >
          Add Problem
        </Link>

        <span className="text-green-400">
          👤 {userName}
        </span>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;