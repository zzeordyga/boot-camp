import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="stack">
      <h1>Assignment 09</h1>
      <p>Setup Firebase &amp; Advanced Features in Next.js.</p>
      <ul className="checklist">
        <li>Koneksi Firestore lewat Firebase SDK</li>
        <li>Data fetching dengan getDocs</li>
        <li>Real-time sync dengan onSnapshot dan pencarian judul</li>
        <li>Loading state, error state, dan Error Boundary</li>
      </ul>
      <Link className="btn" href="/posts">
        Buka halaman Posts
      </Link>
    </section>
  );
}
