import { useEffect, useState } from "react";
import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { firebaseErrorMessage } from "../utils/validation";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      // Security Rules allow listing /users only for admins
      const snap = await getDocs(query(collection(db, "users"), orderBy("createdAt", "desc")));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      setError(firebaseErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function changeRole(id, role) {
    try {
      await updateDoc(doc(db, "users", id), { role });
      setUsers((list) => list.map((u) => (u.id === id ? { ...u, role } : u)));
    } catch (err) {
      setError(firebaseErrorMessage(err.code));
    }
  }

  const adminCount = users.filter((u) => u.role === "admin").length;

  return (
    <div className="card wide">
      <h1>Admin Dashboard</h1>
      <p className="muted">Hanya bisa diakses oleh role admin.</p>

      <div className="stats">
        <div><b>{users.length}</b><span>Total user</span></div>
        <div><b>{adminCount}</b><span>Admin</span></div>
        <div><b>{users.length - adminCount}</b><span>User biasa</span></div>
      </div>

      {error && <div className="alert">{error}</div>}
      {loading ? (
        <p className="muted">Memuat data...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Nama</th><th>Email</th><th>Role</th><th>Aksi</th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                  <td>
                    {u.id === user.uid ? (
                      <span className="muted">(kamu)</span>
                    ) : (
                      <select value={u.role} onChange={(e) => changeRole(u.id, e.target.value)}>
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
