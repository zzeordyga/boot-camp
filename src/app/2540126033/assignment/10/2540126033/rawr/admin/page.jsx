'use client';

import ProtectedRoute from "../../components/protectedRoute";
import { useAuth } from "../../context/AuthContext";

export default function AdminPage() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="p-10 bg-red-50 min-h-screen">
        <h1 className="text-3xl font-bold text-red-700">Admin Dashboard</h1>
        <p>Only admins can see this.</p>
        <button onClick={logout} className="mt-4 border border-red-500 p-2 rounded">
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}