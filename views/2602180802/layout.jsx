import Nav from "./Nav";
import { NIM, STUDENT_NAME } from "./config";
import styles from "./styles.module.css";

export const metadata = {
  title: `Pokédex - ${NIM}`,
  description: "Take-home React & Next.js: layout, nested route, API, dan hooks.",
};

export default function Layout({ children }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h1 className={styles.brand}>Pokédex</h1>
            <p className={styles.sub}>
              {STUDENT_NAME} · {NIM}
            </p>
          </div>
          <Nav />
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Data dari{" "}
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer">
          PokeAPI
        </a>{" "}
        · Dibuat dengan Next.js &amp; React
      </footer>
    </div>
  );
}
