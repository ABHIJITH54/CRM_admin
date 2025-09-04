

// src/components/AuthGuard.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
  const { access } = useSelector((state) => state.auth);

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

