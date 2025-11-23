import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ role }) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav className="navbar">
    <div className="navbar-left">
        <h1 className="navbar-logo">IT Bootcamp App</h1>
    </div>
      <ul className="navbar-right">
        {role === "user" && (
          <li><Link to="/user/profile">User Profile</Link></li>
        )}

        {role === "admin" && (
          <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
        )}

        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
