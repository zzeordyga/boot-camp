'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, role, logout, loading } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <nav className="navbar">
      <Link href="/" className="brand">Firebase Auth Test</Link>
      <div className="nav-links">
        {loading ? null : user ? (
          <>
            <Link href="/user/profile">Profile</Link>
            {role === 'admin' && <Link href="/admin/dashboard">Admin</Link>}
            <button className="btn btn-small" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
