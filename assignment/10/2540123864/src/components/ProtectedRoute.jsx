import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, role, requiredRole, children }) => {
  if (!user) return <Navigate to="/login" />;

  if (requiredRole && role !== requiredRole)
    return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
