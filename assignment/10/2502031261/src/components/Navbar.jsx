import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        Firebase RBAC Demo
      </Link>
      <div className="nav-links">
        {currentUser ? (
          <>
            <span className="user-badge">
              {currentUser.email} ({role || "..."})
            </span>
            <Link to="/user/profile">Profile</Link>
            {role === "admin" && <Link to="/admin/dashboard">Admin Dashboard</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
