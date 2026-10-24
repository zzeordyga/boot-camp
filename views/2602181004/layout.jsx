'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './cats.module.css';

const links = [
  { href: '/2602181004', label: 'Facts' },
  { href: '/2602181004/details', label: 'Breeds' },
];

export default function Layout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const previous = document.body.style.margin;
    document.body.style.margin = '0';
    return () => {
      document.body.style.margin = previous;
    };
  }, []);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <h1 className={styles.name}>Ishvara Pranidhana Lakshmana</h1>
            <span className={styles.nim}>2602181004 · Computer Science</span>
          </div>
          <nav className={styles.nav}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.navActive : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
