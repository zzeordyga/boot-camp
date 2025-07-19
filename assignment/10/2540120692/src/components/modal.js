import styles from "./css/modal.module.css";

export function Modal({ title = "", message = "", status = "", onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2
          className={
            status === "SUCCESS"
              ? styles.modalStatusSuccess
              : styles.modalStatusFailure
          }
        >
          {status === "SUCCESS" ? "✔" : "✖"}
        </h2>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalMessage}>{message}</p>
        <button onClick={onClose} className={styles.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
}
