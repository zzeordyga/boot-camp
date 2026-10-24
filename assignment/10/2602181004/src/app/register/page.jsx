'use client'
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth, isFirebaseConfigured } from '@/lib/firebase';
import { createProfile } from '@/lib/users';
import { describeError, safeRedirect, validateRegister } from '@/lib/validation';
import { useAuth } from '@/components/AuthProvider';
import { Pending } from '@/components/RequireAuth';
import Field from '@/components/Field';
import useForm from '@/lib/useForm';
import styles from '../auth.module.css';

function nextTarget() {
  return safeRedirect(new URLSearchParams(window.location.search).get('next'), '/user/profile');
}

export default function RegisterPage() {
  const { status, user } = useAuth();
  const router = useRouter();
  const form = useForm({ name: '', email: '', password: '', confirm: '' }, validateRegister);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(isFirebaseConfigured ? '' : describeError());
  const busy = useRef(false);

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
      const credential = await createUserWithEmailAndPassword(
        auth,
        form.values.email.trim(),
        form.values.password,
      );
      try {
        await createProfile(credential.user, form.values.name.trim());
      } catch (error) {
        await deleteUser(credential.user).catch(() => {});
        throw error;
      }
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
      <h1 className={styles.title}>Create an account</h1>
      <p className={styles.subtitle}>New accounts start with the user role.</p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          required
          maxLength={50}
          value={form.values.name}
          onChange={form.onChange}
          onBlur={form.onBlur}
          error={form.errors.name}
        />
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
          autoComplete="new-password"
          required
          minLength={8}
          pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
          title="At least 8 characters with a letter and a number"
          value={form.values.password}
          onChange={form.onChange}
          onBlur={form.onBlur}
          error={form.errors.password}
          hint="At least 8 characters, with a letter and a number."
        />
        <Field
          label="Confirm password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          value={form.values.confirm}
          onChange={form.onChange}
          onBlur={form.onBlur}
          error={form.errors.confirm}
        />

        {formError && (
          <div className={styles.formError} role="alert">
            {formError}
          </div>
        )}

        <button type="submit" className={`${styles.button} ${styles.block}`} disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className={styles.switch}>
        Already registered? <Link href="/login">Log in</Link>
      </p>
    </section>
  );
}
