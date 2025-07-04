import Head from 'next/head';
import styles from './layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokémon Browser</title>
        <meta name="description" content="A stylish Pokémon browser by <nama-kamu>" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Pokémon Browser</h1>
        <p className={styles.headerSubtitle}>Explore your favorite Pokémon!</p>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Created by Charles Yansen - 2501978843</p>
      </footer>
    </div>
  );
}