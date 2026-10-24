import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Posts · 2602181004',
  description: 'Next.js and Firestore posts with real-time search',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="headerInner">
            <div className="brand">
              <h1 className="name">Ishvara Pranidhana Lakshmana</h1>
              <span className="nim">2602181004 · Computer Science</span>
            </div>
            <nav className="nav">
              <Link href="/posts" className="navLink">
                Posts
              </Link>
            </nav>
          </div>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
