'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { EMAIL_REGEX, getAuthErrorMessage } from '@/lib/authErrors';

export default function LoginPage() {
  const router = useRouter();
  const { user, role, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Already logged in -> go to the right page
  useEffect(() => {
    if (!loading && user && role) {
      router.replace(role === 'admin' ? '/admin/dashboard' : '/user/profile');
    }
  }, [loading, user, role, router]);

  function validate() {
    const e = {};
    if (!EMAIL_REGEX.test(email.trim())) e.email = 'Enter a valid email address.';
    if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    try {
      // Token persistence: local = survives browser restart, session = cleared when tab closes
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Redirect is handled by the useEffect above once the role is loaded
    } catch (err) {
      setErrors({ form: getAuthErrorMessage(err.code) });
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {errors.form && <p className="error box">{errors.form}</p>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label className="checkbox">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Login'}
        </button>
      </form>
      <p className="muted">
        No account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
}
