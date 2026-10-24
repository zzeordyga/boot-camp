import styles from '@/app/auth.module.css';

export default function Field({ label, name, error, hint, ...inputProps }) {
  const messageId = `${name}-message`;
  const message = error || hint;
  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`${styles.input} ${error ? styles.inputInvalid : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={message ? messageId : undefined}
        {...inputProps}
      />
      {message && (
        <span id={messageId} className={error ? styles.fieldError : styles.hint}>
          {message}
        </span>
      )}
    </div>
  );
}
