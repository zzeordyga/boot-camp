import Link from "next/link";
import React from "react";
import styles from './NavBar.module.css'

export default function NavBar() {
  return (
    <>
      <nav className={styles.navbar}>
            <h1 className={styles.title}>Firebase Test App</h1>
          <Link href={"/"}>Home</Link>
          <Link href={"/posts"}>Posts</Link>
      </nav>
    </>
  );
}
