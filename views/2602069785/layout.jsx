import Link from "next/link";
import styles from "./styles.module.css";

export default function DevSpaceLayout({ children }) {
  return (
    <div className={styles.page}>
      <header className={styles.navbar}>
        <Link href="/2602069785" className={styles.logo}>
          <span className={styles.logoIcon}>D</span>
          DevSpace
        </Link>

        <nav className={styles.navLinks}>
          <Link href="/2602069785">Dashboard</Link>
          <Link href="/2602069785/details">Explore</Link>
        </nav>

        <div className={styles.profile}>
          <div className={styles.avatar}>R</div>
          <span>Rendy</span>
        </div>
      </header>

      {children}

      <footer className={styles.footer}>
        © 2026 DevSpace — Built with React & Next.js
      </footer>
    </div>
  );
}