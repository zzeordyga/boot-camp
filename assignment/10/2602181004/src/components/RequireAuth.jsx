'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { describeError } from '@/lib/validation';
import styles from '@/app/auth.module.css';

export function Pending({ text }) {
  return (
    <div className={styles.pending} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      {text}
    </div>
  );
}

function Notice({ code, title, children }) {
  return (
    <section className={styles.notice} role="alert">
      <span className={styles.noticeCode}>{code}</span>
      <h2 className={styles.noticeTitle}>{title}</h2>
      <div className={styles.noticeText}>{children}</div>
    </section>
  );
}

export default function RequireAuth({ role, children }) {
  const { status, profile, error, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'guest') router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [status, pathname, router]);

  if (status === 'loading') return <Pending text="Checking your session…" />;
  if (status === 'guest') return <Pending text="Redirecting to login…" />;

  if (error || !profile) {
    return (
      <Notice code="!" title="Your profile could not be loaded">
        <p>{error ? describeError(error) : 'This account has no profile document in Firestore.'}</p>
        <button className={styles.ghostButton} onClick={logout}>
          Log out
        </button>
      </Notice>
    );
  }

  if (role && profile.role !== role) {
    return (
      <Notice code="403" title="Admins only">
        <p>
          You are signed in as <strong>{profile.email}</strong> with the <strong>{profile.role}</strong>{' '}
          role. This page needs the <strong>{role}</strong> role.
        </p>
        <Link href="/user/profile" className={styles.button}>
          Go to my profile
        </Link>
      </Notice>
    );
  }

  return children;
}
