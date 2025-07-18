import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute({ user, role }) {
  if (!user) return <Navigate to="/login" />;
  return role === "admin" ? <Outlet /> : <Navigate to="/" />;
}
