'use client';

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';

/**
 * Registration Page Component
 * 
 * This page allows new users to create an account using email and password.
 * After registration, a user document is created in Firestore with role "user".
 * 
 * Learning concepts:
 * - Firebase Authentication (createUserWithEmailAndPassword)
 * - Firestore document creation (setDoc)
 * - Form handling and validation
 * - Error handling with user-friendly messages
 */
export default function RegisterPage() {
  const router = useRouter();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return 'Please fill in all fields';
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address';
    }

    // Password length check
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }

    return null; // No errors
  };

  /**
   * Handle form submission
   * 1. Validate inputs
   * 2. Create Firebase Auth account
   * 3. Create user document in Firestore with role
   * 4. Redirect to login page
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
      // Step 1: Create authentication account
      // Firebase automatically hashes the password securely
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Step 2: Create user document in Firestore
      // This stores the user's role and other metadata
      await setDoc(doc(db, 'users', user.uid), {
        email: formData.email,
        role: 'user', // Default role is 'user' (not admin)
        createdAt: serverTimestamp()
      });

      // Show success message
      setSuccess(true);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      // Handle Firebase errors with user-friendly messages
      console.error('Registration error:', err);
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('This email is already registered. Please login instead.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/weak-password':
          setError('Password is too weak. Please use a stronger password.');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">
            Sign up to get started
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center">
              ✅ Account created successfully! Redirecting to login...
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Registration Form */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="you@example.com"
              disabled={loading || success}
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
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              disabled={loading || success}
            />
            <p className="mt-1 text-xs text-gray-500">
              Must be at least 6 characters long
            </p>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              disabled={loading || success}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading || success
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
