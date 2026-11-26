'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { EMAIL_REGEX, getAuthErrorMessage } from '@/lib/authErrors';

export default function RegisterPage() {
  const router = useRouter();
  const { refreshProfile } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e = {};
    if (name.trim().length < 2 || name.trim().length > 50) e.name = 'Name must be 2-50 characters.';
    if (!EMAIL_REGEX.test(email.trim())) e.email = 'Enter a valid email address.';
    if (password.length < 6) e.password = 'Password must be at least 6 characters.';
    else if (!/[A-Za-z]/.test(password) || !/\d/.test(password))
      e.password = 'Password must contain letters and numbers.';
    if (confirm !== password) e.confirm = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});
    try {
      // 1. Create the account in Firebase Authentication (password is hashed by Firebase)
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      // 2. Store the role in Firestore. Everyone registers as 'user';
      //    the Security Rules reject any other role.
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: name.trim(),
        email: cred.user.email,
        role: 'user',
        createdAt: serverTimestamp(),
      });

      // 3. Reload the profile into context, then go to the profile page
      await refreshProfile();
      router.replace('/user/profile');
    } catch (err) {
      setErrors({ form: getAuthErrorMessage(err.code) });
      setSubmitting(false);
    }
  }

  return (
    <div className="card">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {errors.form && <p className="error box">{errors.form}</p>}

        <label htmlFor="name">Full name</label>
        <input
          id="name"
          type="text"
          required
          minLength={2}
          maxLength={50}
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label htmlFor="confirm">Confirm password</label>
        <input
          id="confirm"
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {errors.confirm && <p className="error">{errors.confirm}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="muted">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
}
