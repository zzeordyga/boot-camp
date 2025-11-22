import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { currentUser, userRole } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && userRole !== "admin") {
    return <Navigate to="/user/profile" replace />;
  }

  return children;
};

export default ProtectedRoute;
