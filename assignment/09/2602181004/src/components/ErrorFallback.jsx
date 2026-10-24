'use client'
import styles from '@/app/posts/posts.module.css';

export default function ErrorFallback({ error, onReset }) {
  return (
    <section className={styles.fallback} role="alert">
      <span className={styles.fallbackIcon} aria-hidden="true">!</span>
      <h2 className={styles.fallbackTitle}>Something went wrong</h2>
      <p className={styles.fallbackText}>
        This part of the page crashed, but the rest of the app is still fine. You can try
        again, or reload the page if the problem keeps happening.
      </p>
      {error?.message && <code className={styles.fallbackDetail}>{error.message}</code>}
      <div className={styles.actions}>
        <button className={styles.button} onClick={onReset}>
          Try again
        </button>
        <button className={styles.ghostButton} onClick={() => window.location.reload()}>
          Reload page
        </button>
      </div>
    </section>
  );
}
