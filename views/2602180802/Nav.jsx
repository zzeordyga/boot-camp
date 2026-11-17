"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NIM } from "./config";
import styles from "./styles.module.css";

export default function Nav() {
  const pathname = usePathname() || "";
  const onDetails = pathname.includes("/details");

  return (
    <nav className={styles.nav} aria-label="Navigasi utama">
      <Link
        href={`/${NIM}`}
        className={`${styles.navLink} ${!onDetails ? styles.navActive : ""}`}
      >
        Pokédex
      </Link>
      <Link
        href={`/${NIM}/details?name=pikachu`}
        className={`${styles.navLink} ${onDetails ? styles.navActive : ""}`}
      >
        Details
      </Link>
    </nav>
  );
}
