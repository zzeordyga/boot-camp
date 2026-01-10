'use client';

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useRouter } from 'next/navigation';

/**
 * ProtectedRoute Component
 * 
 * This component wraps pages that require authentication and/or specific roles.
 * It checks if the user is logged in and has the required role before showing content.
 * 
 * HOW IT WORKS:
 * 1. Listen for auth state changes (onAuthStateChanged)
 * 2. If user logged in, fetch their role from Firestore
 * 3. Check if user has required role
 * 4. Show content if authorized, redirect if not
 * 
 * USAGE:
 * <ProtectedRoute requireAuth={true}>
 *   <YourPageContent />
 * </ProtectedRoute>
 * 
 * <ProtectedRoute requireAuth={true} requireRole="admin">
 *   <AdminOnlyContent />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({ 
  children, 
  requireAuth = false,
  requireRole = null 
}) {
  const router = useRouter();
  
  // State
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    // This runs whenever user logs in or logs out
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        // Case 1: No user logged in
        if (!currentUser) {
          if (requireAuth) {
            // Need auth but not logged in → redirect to login
            router.push('/login');
          } else {
            // Don't need auth → allow access
            setAuthorized(true);
          }
          setLoading(false);
          return;
        }

        // Case 2: User is logged in
        setUser(currentUser);

        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (!userDoc.exists()) {
          console.error('User document not found');
          router.push('/login');
          setLoading(false);
          return;
        }

        const userData = userDoc.data();
        const role = userData.role;
        setUserRole(role);

        // Case 3: Check role requirements
        if (requireRole) {
          // Need specific role
          if (role === requireRole) {
            // User has correct role → allow access
            setAuthorized(true);
          } else {
            // User doesn't have required role → deny access
            setAuthorized(false);
          }
        } else {
          // No specific role required, just need to be logged in
          setAuthorized(true);
        }

        setLoading(false);

      } catch (error) {
        console.error('Error checking authorization:', error);
        router.push('/login');
        setLoading(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [requireAuth, requireRole, router]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  // If not authorized and role is required, show access denied
  if (!authorized && requireRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
            {requireRole && (
              <span className="block mt-2 text-sm">
                Required role: <strong>{requireRole}</strong><br/>
                Your role: <strong>{userRole || 'none'}</strong>
              </span>
            )}
          </p>
          <button
            onClick={() => router.push('/user/profile')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Go to Your Profile
          </button>
        </div>
      </div>
    );
  }

  // If authorized, show the protected content
  return authorized ? children : null;
}
