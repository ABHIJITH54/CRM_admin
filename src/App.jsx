
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Customers from "./components/Customers";
import StaffManagement from "./components/StaffManagement";
import Manager from "./components/Manager";
import Departments from "./components/Department"
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        }
      />
      <Route
        path="/customers"
        element={
          <AuthGuard>
            <Customers />
          </AuthGuard>
        }
      />
      <Route
        path="/staff"
        element={
          <AuthGuard>
            <StaffManagement />
          </AuthGuard>
        }
      />
      <Route
        path="/manager"
        element={
          <AuthGuard>
            <Manager />
          </AuthGuard>
        }
      />
      <Route
        path="/department"
        element={
          <AuthGuard>
            <Departments />
          </AuthGuard>
        }
      />
    </Routes>
  );
}

export default App;

