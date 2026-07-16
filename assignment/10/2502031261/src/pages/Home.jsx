import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { currentUser, role } = useAuth();
  return (
    <div className="page-card">
      <h2>Welcome</h2>
      {currentUser ? (
        <p>
          You are logged in as <strong>{currentUser.email}</strong> with role{" "}
          <strong>{role}</strong>.
        </p>
      ) : (
        <p>
          Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to
          continue.
        </p>
      )}
    </div>
  );
}

export function Unauthorized() {
  return (
    <div className="page-card">
      <h2>403 — Unauthorized</h2>
      <p>You are logged in, but your role does not have access to this page.</p>
      <Link to="/user/profile">Back to profile</Link>
    </div>
  );
}
