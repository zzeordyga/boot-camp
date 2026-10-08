import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Assignment 09 - Alif Arya Ramadhan',
  description: 'Next.js + Firebase Firestore',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <header className="site-header">
          <div>
            <Link href="/" className="brand">Firestore Posts</Link>
            <p className="owner">Alif Arya Ramadhan - 2602157440</p>
          </div>
          <nav>
            <Link href="/">Beranda</Link>
            <Link href="/posts">Posts</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
