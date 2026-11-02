import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <Link to="/" className="brand">AuthLab</Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        {user && <NavLink to="/user/profile">Profile</NavLink>}
        {role === "admin" && <NavLink to="/admin/dashboard">Admin</NavLink>}
        {!user && <NavLink to="/login">Login</NavLink>}
        {!user && <NavLink to="/register">Register</NavLink>}
        {user && (
          <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
}
