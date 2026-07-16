import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
  
        const snap = await getDocs(collection(db, "users"));
        setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (err) {
        setError("Failed to load users: " + err.message);
      }
    }
    loadUsers();
  }, []);

  return (
    <div className="page-card">
      <h2>Admin Dashboard</h2>
      <p>
        This page is authorized for the <strong>admin</strong> role only, enforced both
        by a frontend route guard and by Firestore Security Rules.
      </p>
      <p>Logged in as: {currentUser.email}</p>

      {error && <p className="error-text">{error}</p>}

      <h3>All registered users</h3>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>UID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
