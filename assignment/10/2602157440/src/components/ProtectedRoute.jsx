import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Route guard ("middleware") for the frontend.
// - not logged in           -> redirect to /login
// - logged in, wrong role   -> redirect to /unauthorized
export default function ProtectedRoute({ allowedRoles }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="center muted">Memeriksa sesi...</div>;

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
