"use client";

import { usePathname } from "next/navigation";
import styles from "../../../views/2602123622/style.module.css";

export default function Layout({ children }) {
  const pathname = usePathname();
  const isAssignment11 = pathname.includes("/assignment-11");

  return (
    <div className={styles.container}>
      {!isAssignment11 && (
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>Howen Antonio - 2602123622</h1>

            <nav className={styles.nav}>
              <a href="/2602123622">Home</a>
              <a href="/2602123622/details">Details</a>
            </nav>
          </div>
        </header>
      )}

      <main className={styles.main}>{children}</main>

      {!isAssignment11 && (
        <footer className={styles.footer}>© 2026 Computer Science Student</footer>
      )}
    </div>
  );
}