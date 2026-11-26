'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

function ProfileContent() {
  const { user, profile, role } = useAuth();

  return (
    <div className="card">
      <h1>My Profile</h1>
      <p><strong>Name:</strong> {profile?.name ?? '-'}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> <span className={`badge ${role}`}>{role ?? 'unknown'}</span></p>
      <p><strong>UID:</strong> <code>{user.uid}</code></p>
    </div>
  );
}

export default function ProfilePage() {
  // Any authenticated user can access this page
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
