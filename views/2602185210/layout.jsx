import styles from "./styles.module.css";

export const studentInfo = {
  name: "Anton Wijaya Tjong",
  nim: "2602185210",
};

export default function StudentLayout({ children }) {
  return (
    <div className={styles.appShell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/2602185210">
          <span className={styles.brandMark}>A</span>
          <span>Anton<span className={styles.brandAccent}>Board</span></span>
        </a>
        <div className={styles.studentBadge}>
          <span className={styles.statusDot} />
          {studentInfo.name} · {studentInfo.nim}
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        Built with React, Next.js &amp; JSONPlaceholder API
      </footer>
    </div>
  );
}
