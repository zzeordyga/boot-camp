'use client';

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';

/**
 * Login Page Component
 * 
 * This page allows users to login with their email and password.
 * After login, it fetches the user's role from Firestore and redirects accordingly.
 * 
 * Learning concepts:
 * - Firebase Authentication (signInWithEmailAndPassword)
 * - Firestore data fetching (getDoc)
 * - Form handling and validation
 * - Conditional routing based on user role
 */
export default function LoginPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle input changes
   * Updates form state as user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Validate form inputs
   * Returns error message if invalid, null if valid
   */
  const validateForm = () => {
    // Check if all fields are filled
    if (!formData.email || !formData.password) {
      return 'Please fill in all fields';
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    return null; // No errors
  };

  /**
   * Handle form submission
   * 1. Validate inputs
   * 2. Sign in with Firebase Auth
   * 3. Fetch user role from Firestore
   * 4. Redirect based on role (admin → dashboard, user → profile)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Step 1: Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Step 2: Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // User exists in Auth but not in Firestore
        // Create the user document with default role
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'user',
          createdAt: serverTimestamp()
        });
        
        // Default to user profile
        router.push('/user/profile');
        return;
      }

      const userData = userDoc.data();
      const userRole = userData.role;

      // Step 3: Redirect based on role
      if (userRole === 'admin') {
        // Admins go to admin dashboard
        router.push('/admin/dashboard');
      } else {
        // Regular users go to their profile
        router.push('/user/profile');
      }

    } catch (err) {
      // Handle Firebase errors with user-friendly messages
      console.error('Login error:', err);
      
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please check your credentials.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError(err.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              disabled={loading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 active:scale-95'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
              Sign up here
            </a>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800 text-center">
            <strong>Test Accounts:</strong><br/>
            User: user@test.com<br/>
            Admin: admin@test.com<br/>
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
}
