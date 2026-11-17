import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Firebase + Next.js case</h1>
      <p className="sub">Firestore fetching, live sync, search, and error handling.</p>
      <Link href="/posts">Open posts</Link>
    </main>
  );
}
