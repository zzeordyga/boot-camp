import styles from 'views/2440075523/styles.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Pokémon Explorer</h1>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Created by [Your Name] - NIM: 12345678</p>
      </footer>
    </div>
  );
}