'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../../lib/firebase';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../../components/ProtectedRoute';

/**
 * Admin Dashboard Page
 * 
 * This page is ONLY accessible to users with the "admin" role.
 * It displays admin-specific information and a list of all users.
 * 
 * PROTECTION: ProtectedRoute with requireAuth=true AND requireRole="admin"
 */
function DashboardContent() {
  const router = useRouter();
  
  // State
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state and fetch data
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          // Fetch current user's role
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          }

          // Fetch all users from Firestore (admin can see this)
          const usersSnapshot = await getDocs(collection(db, 'users'));
          const usersList = usersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setAllUsers(usersList);

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /**
   * Handle logout
   * Signs out the admin and redirects to login page
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
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                👑 Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome, {user?.email}
              </p>
            </div>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
              Admin Access
            </span>
          </div>

          {/* Admin Actions */}
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/user/profile')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              👤 My Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-gray-900">
              {allUsers.length}
            </div>
            <div className="text-gray-600">Total Users</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-2">👑</div>
            <div className="text-2xl font-bold text-gray-900">
              {allUsers.filter(u => u.role === 'admin').length}
            </div>
            <div className="text-gray-600">Admins</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-3xl mb-2">👤</div>
            <div className="text-2xl font-bold text-gray-900">
              {allUsers.filter(u => u.role === 'user').length}
            </div>
            <div className="text-gray-600">Regular Users</div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📋 All Users
          </h2>

          {allUsers.length === 0 ? (
            <p className="text-gray-600 text-center py-8">
              No users found in the database.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      User ID
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((userData) => (
                    <tr 
                      key={userData.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        {userData.email}
                        {userData.id === user?.uid && (
                          <span className="ml-2 text-xs text-blue-600 font-semibold">
                            (You)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          userData.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {userData.role === 'admin' ? '👑 Admin' : '👤 User'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-gray-600">
                        {userData.id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {userData.createdAt 
                          ? new Date(userData.createdAt.toDate()).toLocaleDateString()
                          : 'N/A'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h2 className="font-semibold text-purple-900 mb-2">
            🔐 Admin Access Level
          </h2>
          <p className="text-purple-800 text-sm">
            This page is protected by ProtectedRoute with <code className="bg-purple-100 px-2 py-1 rounded">requireRole="admin"</code>.
            Only users with the "admin" role can access this page. Regular users will see an "Access Denied" message.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Wrap DashboardContent with ProtectedRoute
 * requireAuth=true means user must be logged in
 * requireRole="admin" means ONLY admins can access this page
 */
export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAuth={true} requireRole="admin">
      <DashboardContent />
    </ProtectedRoute>
  );
}
