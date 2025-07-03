// src/app/2440011961/layout.js
import Link from 'next/link';

export default function MyNIMLayout({ children }) {
  return (
    <div>
      {/* Outer wrapper to utilize the global .container class */}
      <div className="container">
        <header style={{
          marginBottom: '30px',
          paddingBottom: '15px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <h1 style={{ margin: 0, fontSize: '2em', color: '#0070f3' }}>
            <Link href="/2440011961" style={{ textDecoration: 'none', color: 'inherit' }}>
              NIM Page: 2440011961
            </Link>
          </h1>
          <nav>
            <ul className="flex-group" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li>
                <Link href="/2440011961" style={{ padding: '8px 12px', borderRadius: '5px', transition: 'background-color 0.3s ease', backgroundColor: 'rgba(0,112,243,0.1)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/2440011961/details" style={{ padding: '8px 12px', borderRadius: '5px', transition: 'background-color 0.3s ease', backgroundColor: 'rgba(0,112,243,0.1)' }}>
                  Details
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main style={{ padding: '20px 0', minHeight: '60vh' }}>
          {children}
        </main>

        <footer style={{
          marginTop: '30px',
          paddingTop: '15px',
          borderTop: '1px solid #e0e0e0',
          textAlign: 'center',
          fontSize: '0.9em',
          color: '#777'
        }}>
          <p>&copy; {new Date().getFullYear()} Your Name - Next.js Assignment</p>
        </footer>
      </div>
    </div>
  );
}