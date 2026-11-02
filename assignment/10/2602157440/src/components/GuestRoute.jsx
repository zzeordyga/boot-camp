import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Login/Register pages are only for guests.
export default function GuestRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="center muted">Memeriksa sesi...</div>;
  return user ? <Navigate to="/user/profile" replace /> : <Outlet />;
}
