'use client';

import { useEffect, useState } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';

function DashboardContent() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(true);

  async function loadUsers() {
    setBusy(true);
    setError('');
    try {
      // Only succeeds for admins: enforced by Firestore Security Rules
      const snap = await getDocs(collection(db, 'users'));
      setUsers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
      setError('Could not load users. Permission denied by security rules?');
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function changeRole(uid, newRole) {
    try {
      await updateDoc(doc(db, 'users', uid), { role: newRole });
      setUsers((prev) => prev.map((u) => (u.id === uid ? { ...u, role: newRole } : u)));
    } catch (err) {
      console.error(err);
      setError('Failed to update role.');
    }
  }

  return (
    <div className="card wide">
      <h1>Admin Dashboard</h1>
      <p className="muted">Only users with the <code>admin</code> role can see this page.</p>
      {error && <p className="error box">{error}</p>}
      {busy ? (
        <p className="muted">Loading users...</p>
      ) : (
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className={`badge ${u.role}`}>{u.role}</span></td>
                <td>
                  {u.id === user.uid ? (
                    <span className="muted">(you)</span>
                  ) : u.role === 'admin' ? (
                    <button className="btn btn-small btn-outline" onClick={() => changeRole(u.id, 'user')}>
                      Demote
                    </button>
                  ) : (
                    <button className="btn btn-small" onClick={() => changeRole(u.id, 'admin')}>
                      Make admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}
