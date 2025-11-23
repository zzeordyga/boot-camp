'use client';

import ProtectedRoute from "../../components/protectedRoute";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const { user, role, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['user', 'admin']}>
      <div className="p-10">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p>Email: {user?.email}</p>
        <p>Role: <strong>{role}</strong></p>
        <button onClick={logout} className="mt-4 bg-gray-800 text-white p-2 rounded">
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}