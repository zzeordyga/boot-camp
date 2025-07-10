'use client';

import Link from 'next/link';
import styles from './ErrorFallback.module.css'; // adjust the path if needed

export default function Error({ error, reset }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>
        Sorry, we couldn’t load this page properly. You can try again or return to the previous page.
      </p>

      <div className={styles.actions}>
        <button onClick={reset} className={styles.button}>
          Try Again
        </button>
        <Link legacyBehavior href="/2440111573">
          <a className={styles.link}>Go Back</a>
        </Link>
      </div>
    </div>
  );
}
