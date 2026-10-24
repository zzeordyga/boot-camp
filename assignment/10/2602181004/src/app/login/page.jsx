'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  browserSessionPersistence,
  indexedDBLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { describeError, safeRedirect, validateLogin } from '@/lib/validation';
import { useAuth } from '@/components/AuthProvider';
import { Pending } from '@/components/RequireAuth';
import Field from '@/components/Field';
import useForm from '@/lib/useForm';
import styles from '../auth.module.css';

function nextTarget() {
  return safeRedirect(new URLSearchParams(window.location.search).get('next'), '/');
}

export default function LoginPage() {
  const { status, user } = useAuth();
  const router = useRouter();
  const form = useForm({ email: '', password: '', remember: true }, validateLogin);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(isFirebaseConfigured ? '' : describeError());
  const [registerHref, setRegisterHref] = useState('/register');
  const busy = useRef(false);

  useEffect(() => {
    const next = new URLSearchParams(window.location.search).get('next');
    if (next) setRegisterHref(`/register?next=${encodeURIComponent(next)}`);
  }, []);

  useEffect(() => {
    if (status !== 'loading' && user && !busy.current) router.replace(nextTarget());
  }, [status, user, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');
    if (Object.keys(form.validateAll()).length > 0) return;

    busy.current = true;
    setSubmitting(true);
    try {
      await setPersistence(auth, form.values.remember ? indexedDBLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, form.values.email.trim(), form.values.password);
      router.replace(nextTarget());
    } catch (error) {
      busy.current = false;
      setSubmitting(false);
      setFormError(describeError(error));
    }
  };

  if (status === 'loading' || (user && !busy.current)) return <Pending text="Checking your session…" />;

  return (
    <section className={styles.authCard}>
      <h1 className={styles.title}>Log in</h1>
      <p className={styles.subtitle}>Welcome back. Log in to see your profile.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.values.email}
          onChange={form.onChange}
          onBlur={form.onBlur}
          error={form.errors.email}
        />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={form.values.password}
          onChange={form.onChange}
          onBlur={form.onBlur}
          error={form.errors.password}
        />
        <label className={styles.checkbox}>
          <input type="checkbox" name="remember" checked={form.values.remember} onChange={form.onChange} />
          <span>
            Keep me logged in
            <span className={styles.hint}>
              {form.values.remember
                ? 'You stay logged in on this device until you log out.'
                : 'You will be logged out when you close this tab.'}
            </span>
          </span>
        </label>

        {formError && (
          <div className={styles.formError} role="alert">
            {formError}
          </div>
        )}

        <button type="submit" className={`${styles.button} ${styles.block}`} disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className={styles.switch}>
        No account yet? <Link href={registerHref}>Register</Link>
      </p>
    </section>
  );
}
