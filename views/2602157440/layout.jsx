import Link from 'next/link';
import styles from './style.module.css';

export const metadata = {
  title: 'Pokedex - Alif Arya Ramadhan',
};

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <Link href="/2602157440" className={styles.brand}>
            Pokedex Mini
          </Link>
          <p className={styles.owner}>Alif Arya Ramadhan - 2602157440</p>
        </div>
        <nav className={styles.nav}>
          <Link href="/2602157440">Daftar</Link>
          <Link href="/2602157440/details">Detail</Link>
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Data dari pokeapi.co</footer>
    </div>
  );
}
