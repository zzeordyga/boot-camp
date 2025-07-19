import styles from "./css/loading.module.css";

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <span className={styles.text}>Loading</span>
    </div>
  );
}