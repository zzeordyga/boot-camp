'use client';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  if (!currentUser) {
    // Jika tidak ada user, arahkan ke halaman login
    if (typeof window !== 'undefined') router.push('/login');
    return <p>Mengarahkan...</p>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch {
      alert('Gagal untuk logout.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl">Profil Pengguna</h1>
      <p>Email: {currentUser.email}</p>
      <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">Logout</button>
    </div>
  );
}
