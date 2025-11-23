'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/assignment/10/2501995143');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!currentUser) {
    return null; // ProtectedRoute will handle the redirect
  }

  return (
    <ProtectedRoute requiredRoles={['user']}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Welcome back, {currentUser.email}</p>
        </div>

        <div className="protected-section fade-in">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
              <p className="text-gray-600 text-sm">Your authentication details and settings</p>
            </div>
            <div className="role-badge role-user">
              User Role
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Email Address</span>
              <span className="text-gray-900">{currentUser.email}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">User ID</span>
              <span className="text-gray-900 text-sm font-mono">{currentUser.uid}</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Account Created</span>
              <span className="text-gray-900">
                {currentUser.metadata.creationTime 
                  ? new Date(currentUser.metadata.creationTime).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Last Login</span>
              <span className="text-gray-900">
                {currentUser.metadata.lastSignInTime 
                  ? new Date(currentUser.metadata.lastSignInTime).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="btn-secondary w-full md:w-auto"
            >
              Log Out
            </button>
          </div>
        </div>

        <div className="mt-8 protected-section fade-in">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Routes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
              <h3 className="font-medium text-gray-800 mb-2">/user/profile</h3>
              <p className="text-gray-600 text-sm">Your personal profile page (accessible to all authenticated users)</p>
              <span className="mt-2 inline-block role-badge role-user">User Role Required</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition">
              <h3 className="font-medium text-gray-800 mb-2">/admin/dashboard</h3>
              <p className="text-gray-600 text-sm">Admin control panel (restricted to admin users only)</p>
              <span className="mt-2 inline-block role-badge role-admin">Admin Role Required</span>
            </div>
          </div>
        </div>
      </motion.div>
    </ProtectedRoute>
  );
}