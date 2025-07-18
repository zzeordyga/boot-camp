'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import getConfig from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = 'Name is empty';
    if (!form.email) newErrors.email = 'Email is empty';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';

    if (!form.password) newErrors.password = 'Password is empty';
    else if (form.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (!form.confirmPassword)
      newErrors.confirmPassword = 'Confirm password is empty';
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    return newErrors;
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    const { db, auth } = getConfig();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;
      await setDoc(doc(db, 'Users', user.uid), {
        name: form.name,
        email: user.email,
        role: 'user',
      });

      router.push('/');
    } catch (error) {
      console.error(error);
      setErrors({ firebase: error.message });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
      </div>

      <div className="space-y-4">
        {['name', 'email'].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors[field] && <div className="text-sm text-red-600 mt-1">{errors[field]}</div>}
          </div>
        ))}

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
          </button>
          {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type={showConfirm ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((prev) => !prev)}
            className="absolute right-3 top-9 text-gray-500"
          >
          </button>
          {errors.confirmPassword && (
            <div className="text-sm text-red-600 mt-1">{errors.confirmPassword}</div>
          )}
        </div>

        {errors.firebase && (
          <div className="text-sm text-red-600">{errors.firebase}</div>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
