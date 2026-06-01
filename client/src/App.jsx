import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProblem from "./pages/AddProblem";
import Problems from "./pages/Problems";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route
  path="/add-problem"
  element={
    <ProtectedRoute>
      <AddProblem />
    </ProtectedRoute>
  }
/>

        <Route
  path="/problems"
  element={
    <ProtectedRoute>
      <Problems />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );

}

export default App;