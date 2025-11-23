'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ProtectedRoute({ children, requiredRoles = [] }) {
  const { currentUser, userRole, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      // Not authenticated - redirect to login
      router.push('/assignment/10/2501995143');
    } else if (currentUser && requiredRoles.length > 0 && !hasRole(requiredRoles[0])) {
      // Authenticated but doesn't have required role
      router.push('/assignment/10/2501995143/user/profile');
    }
  }, [currentUser, userRole, loading, requiredRoles, hasRole, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-12"
      >
        <div className="text-4xl mb-4">🔒</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          Please log in to access this protected content.
        </p>
        <button 
          onClick={() => router.push('/assignment/10/2501995143')}
          className="btn-primary px-6 py-3"
        >
          Go to Login
        </button>
      </motion.div>
    );
  }

  if (requiredRoles.length > 0 && !hasRole(requiredRoles[0])) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center py-12"
      >
        <div className="text-4xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don't have the required permissions to access this page. 
          This area is restricted to users with {requiredRoles.join(' or ')} role.
        </p>
        <button 
          onClick={() => router.push('/assignment/10/2501995143/user/profile')}
          className="btn-primary px-6 py-3"
        >
          Go to Profile
        </button>
      </motion.div>
    );
  }

  return children;
}