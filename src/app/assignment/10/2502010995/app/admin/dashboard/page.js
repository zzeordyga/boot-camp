'use client';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { currentUser, userRole } = useAuth();
  const router = useRouter();

  // Otorisasi: Cek role pengguna
  if (userRole !== 'admin') {
    // Jika bukan admin, tendang keluar
    if (typeof window !== 'undefined') router.push('/user/profile');
    return <p>Akses ditolak. Anda bukan admin.</p>;
  }

  return (
    <div className="p-8 bg-blue-100">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p>Selamat datang, Admin {currentUser.email}!</p>
    </div>
  );
}
