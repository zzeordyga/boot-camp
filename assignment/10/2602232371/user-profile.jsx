'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../../components/ProtectedRoute';

/**
 * User Profile Page
 * 
 * This page is accessible to ANY authenticated user (both user and admin roles).
 * It displays user information and provides a logout button.
 * 
 * PROTECTION: ProtectedRoute with requireAuth=true (no specific role required)
 */
function ProfileContent() {
  const router = useRouter();
  
  // State
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state and fetch user data
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch user role from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Handle logout
   * Signs out the user and redirects to login page
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              👤 User Profile
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              userRole === 'admin' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {userRole === 'admin' ? '👑 Admin' : '👤 User'}
            </span>
          </div>

          {/* User Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email Address
              </label>
              <p className="text-lg text-gray-900">
                {user?.email}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                User ID
              </label>
              <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                {user?.uid}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Account Role
              </label>
              <p className="text-lg text-gray-900">
                {userRole || 'Loading...'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Email Verified
              </label>
              <p className="text-lg text-gray-900">
                {user?.emailVerified ? '✅ Yes' : '❌ No'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
            {userRole === 'admin' && (
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold"
              >
                🔐 Go to Admin Dashboard
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="font-semibold text-blue-900 mb-2">
            ℹ️ About This Page
          </h2>
          <p className="text-blue-800 text-sm">
            This is a protected page that requires authentication. 
            Any logged-in user (both 'user' and 'admin' roles) can access this page.
            The ProtectedRoute component checks if you're logged in before showing this content.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Wrap ProfileContent with ProtectedRoute
 * requireAuth=true means user must be logged in
 * No requireRole means any role can access (user or admin)
 */
export default function ProfilePage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <ProfileContent />
    </ProtectedRoute>
  );
}
