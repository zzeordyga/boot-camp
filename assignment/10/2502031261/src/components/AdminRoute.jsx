import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function AdminRoute({ children }) {
  const { currentUser, role } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
