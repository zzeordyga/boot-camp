'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import Field from '@/components/Field';
import { updateName } from '@/lib/users';
import { describeError, validateName } from '@/lib/validation';
import styles from '../../auth.module.css';

const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' });

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function ProfilePage() {
  const { profile } = useAuth();
  const [name, setName] = useState(profile.name);
  const [nameError, setNameError] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const isAdmin = profile.role === 'admin';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    const error = validateName(name);
    setNameError(error);
    if (error) return;
    setSaving(true);
    try {
      await updateName(profile.uid, name.trim());
      setMessage('Name saved.');
    } catch (err) {
      setNameError(describeError(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <h1 className={styles.pageTitle}>My profile</h1>

      <section className={styles.card}>
        <div className={styles.profileHead}>
          <span className={styles.avatar} aria-hidden="true">
            {initials(profile.name) || '?'}
          </span>
          <div>
            <h2 className={styles.profileName}>{profile.name}</h2>
            <span className={styles.muted}>{profile.email}</span>
          </div>
          <span className={`${styles.badge} ${isAdmin ? styles.badgeAdmin : ''}`}>{profile.role}</span>
        </div>
        <dl className={styles.details}>
          <div>
            <dt>Member since</dt>
            <dd>{profile.createdAt ? dateFormat.format(profile.createdAt) : '—'}</dd>
          </div>
          <div>
            <dt>User ID</dt>
            <dd className={styles.mono}>{profile.uid}</dd>
          </div>
        </dl>
      </section>

      <h2 className={styles.sectionTitle}>What you can access</h2>
      <ul className={styles.access}>
        <li className={styles.accessItem}>
          <span className={`${styles.accessIcon} ${styles.allowed}`} aria-hidden="true">✓</span>
          <div>
            <strong>Profile</strong>
            <span className={styles.muted}>Any logged-in user</span>
          </div>
        </li>
        <li className={styles.accessItem}>
          <span className={`${styles.accessIcon} ${isAdmin ? styles.allowed : styles.denied}`} aria-hidden="true">
            {isAdmin ? '✓' : '✕'}
          </span>
          <div>
            <strong>Admin dashboard</strong>
            <span className={styles.muted}>
              {isAdmin ? (
                <Link href="/admin/dashboard">Open the dashboard</Link>
              ) : (
                'Needs the admin role'
              )}
            </span>
          </div>
        </li>
      </ul>

      <h2 className={styles.sectionTitle}>Edit name</h2>
      <form className={`${styles.card} ${styles.inlineForm}`} onSubmit={handleSubmit}>
        <Field
          label="Display name"
          name="name"
          required
          maxLength={50}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setNameError(validateName(event.target.value));
            setMessage('');
          }}
          error={nameError}
        />
        <div className={styles.formFooter}>
          {message && <span className={styles.success}>{message}</span>}
          <button type="submit" className={styles.button} disabled={saving || name.trim() === profile.name}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </form>
    </>
  );
}
