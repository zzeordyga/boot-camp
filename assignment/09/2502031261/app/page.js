import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "3rem 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>Next.js + Firebase Assignment</h1>
      <p>NIM: 2502031261</p>
      <ul>
        <li>
          <Link href="/posts">/posts — fetch with getDocs</Link>
        </li>
        <li>
          <Link href="/posts/realtime">
            /posts/realtime — onSnapshot + search
          </Link>
        </li>
      </ul>
    </main>
  );
}
