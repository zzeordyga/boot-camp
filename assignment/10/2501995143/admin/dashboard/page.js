'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AdminDashboard() {
  const { currentUser, userRole } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load user data. Please try again later.');
        setLoading(false);
      }
    };

    if (userRole === 'admin') {
      fetchUsers();
    }
  }, [userRole]);

  if (!currentUser || userRole !== 'admin') {
    return null; // ProtectedRoute will handle the redirect
  }

  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users and monitor system activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="protected-section bg-indigo-50 border border-indigo-100 fade-in">
            <h3 className="text-lg font-semibold text-indigo-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-indigo-700">{users.length}</p>
          </div>
          
          <div className="protected-section bg-green-50 border border-green-100 fade-in">
            <h3 className="text-lg font-semibold text-green-900 mb-2">Admin Users</h3>
            <p className="text-3xl font-bold text-green-700">
              {users.filter(user => user.role === 'admin').length}
            </p>
          </div>
          
          <div className="protected-section bg-blue-50 border border-blue-100 fade-in">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Standard Users</h3>
            <p className="text-3xl font-bold text-blue-700">
              {users.filter(user => user.role === 'user').length}
            </p>
          </div>
        </div>

        <div className="protected-section fade-in">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
              <p className="text-gray-600 text-sm">View and manage all registered users</p>
            </div>
            <div className="role-badge role-admin">
              Admin Access
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
              {error}
            </div>
          ) : (
            <>
              {users.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No users found in the database
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 text-sm font-mono text-gray-900">{user.id.substring(0, 8)}...</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{user.email || 'N/A'}</td>
                          <td className="px-6 py-4">
                            <span className={`role-badge ${user.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {user.createdAt?.toDate?.() 
                              ? user.createdAt.toDate().toLocaleDateString()
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-start">
              <svg className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> This is a read-only view of user data. In a production system, admin actions like role changes or user deletion would be implemented here.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}