"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function NimLayout({ children }) {
  const router = useRouter();

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.back}
          onClick={() => router.back()}
          aria-label="Kembali"
        >
          ←
        </button>
        <Link href="/2602187802" className={styles.brand}>
          Pokédex
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
}