'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import getConfig from '@/firebase/config';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState('guest');
  const [loading, setLoading] = useState(true);

  const isActive = (path) => pathname === path;

  useEffect(() => {
    const { db, app } = getConfig();
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'Users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setRole(data.role || 'user');
        } else {
          setRole('user');
        }
      } else {
        setRole('guest');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setRole('guest');
    router.push('/');
  };

  if (loading) return null; // Hindari flicker saat loading

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">SecureApp</span>
          </div>

          <div className="flex items-center space-x-4">
            {role !== 'admin' && (
                <Link
                    href="/"
                    className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                    Home
                </Link>
            )}

            {role === 'guest' && (
              <>
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/login') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/register') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Register
                </Link>
              </>
            )}

            {role === 'user' && (
              <Link
                href="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/profile') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Profile
              </Link>
            )}

            {role === 'admin' && (
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin') ? 'bg-red-100 text-red-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin
              </Link>
            )}

            {role !== 'guest' && (
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
