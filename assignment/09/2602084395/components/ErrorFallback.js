import styles from "./ErrorFallback.module.css";

export default function ErrorFallback({ title, message, onRetry }) {
  return (
    <div className={styles.box} role="alert">
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.text}>
        Bagian ini gagal ditampilkan. Coba lagi, dan jika masih gagal,
        muat ulang halaman.
      </p>
      {message && <p className={styles.detail}>Detail: {message}</p>}
      {onRetry && (
        <button type="button" className={styles.button} onClick={onRetry}>
          Coba lagi
        </button>
      )}
    </div>
  );
}
