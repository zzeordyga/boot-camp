"use client";
import React from "react";

export default function Layout({ children }) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Berliana Angelica Hutajulu - 2501997281</h1>
        <nav>
          <a href="/views/2501997281/page" style={styles.link}>Get New Advice</a> | {" "}
          <a href="/views/2501997281/details/page" style={styles.link}>Details</a>
        </nav>

      </header>
      <main style={styles.main}>{children}</main>
      <footer style={styles.footer}>Berliana Angelica Hutajulu | 2501997281 | Computer Science</footer>
    </div>
  );
}

const styles = {
  container: { fontFamily: "sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { background: "#0bc442ff", color: "white", padding: "10px", textAlign: "center" },
  link: { color: "white" },
  main: { flex: 1, padding: "20px" },
  footer: { background: "#eee", textAlign: "center", padding: "10px" },
};