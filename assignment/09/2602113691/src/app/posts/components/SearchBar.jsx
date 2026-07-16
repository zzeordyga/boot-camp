"use client";

import { useRouter } from "next/navigation";
import styles from './components.module.css'

export default function SearchBar() {
  const router = useRouter();

  function handleChange(e) {
    router.push(`/posts?search=${e.target.value}`);
  }

  return <input onChange={handleChange} className={styles.search} />;
}