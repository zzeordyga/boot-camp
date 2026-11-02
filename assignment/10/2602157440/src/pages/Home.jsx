import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user, role } = useAuth();
  return (
    <div className="card">
      <h1>Authentication & Authorization with Firebase</h1>
      <p>
        <b>Authentication</b> menjawab "siapa kamu?" (login dengan email & password).
        <br />
        <b>Authorization</b> menjawab "kamu boleh ngapain?" (role <code>user</code> / <code>admin</code>).
      </p>
      <ul className="routes">
        <li><code>/user/profile</code> — hanya untuk user yang sudah login</li>
        <li><code>/admin/dashboard</code> — hanya untuk role <code>admin</code></li>
      </ul>
      {user ? (
        <p>Kamu login sebagai <b>{user.email}</b> dengan role <span className={`badge ${role}`}>{role ?? "-"}</span></p>
      ) : (
        <p><Link className="btn" to="/login">Login</Link> <Link className="btn btn-ghost" to="/register">Register</Link></p>
      )}
    </div>
  );
}
