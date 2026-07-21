import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className={styles.intro}>
          <h1>Firebase testing web application</h1>
          <p>
            This is the home page. Head over to Posts to see the things that have been posted.
          </p>
        </div>
      </main>
    </div>
  );
}
