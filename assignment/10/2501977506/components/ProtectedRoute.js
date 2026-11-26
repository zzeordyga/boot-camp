'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

/**
 * Frontend route guard.
 *  - not logged in            -> redirect to /login
 *  - logged in, wrong role    -> redirect to /user/profile
 * Usage: <ProtectedRoute>...</ProtectedRoute>
 *        <ProtectedRoute requiredRole="admin">...</ProtectedRoute>
 */
export default function ProtectedRoute({ children, requiredRole }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  const roleDenied = requiredRole && role !== requiredRole;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace('/login');
    } else if (roleDenied) {
      router.replace('/user/profile');
    }
  }, [loading, user, roleDenied, router]);

  if (loading || !user || roleDenied) {
    return <p className="center muted">Checking access...</p>;
  }

  return children;
}
