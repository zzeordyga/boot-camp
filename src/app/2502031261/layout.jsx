'use client'
import React from 'react';
import Link from 'next/link';

const NimLayout = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Arial, sans-serif', background: '#f8fafc' }}>
      <header style={{ background: '#0f172a', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.1rem', margin: 0 }}>NIM 12345678 — Boot Camp Assignment</h1>
        <nav style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
          <Link href="/12345678" style={{ color: '#fff', textDecoration: 'none' }}>Posts</Link>
          <Link href="/12345678/details" style={{ color: '#fff', textDecoration: 'none' }}>Details</Link>
        </nav>
      </header>

      <main style={{ flex: 1, maxWidth: '900px', margin: '0 auto', width: '100%', padding: '2rem' }}>
        {children}
      </main>

      <footer style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', padding: '1rem', borderTop: '1px solid #e2e8f0' }}>
        Built with React hooks + Next.js
      </footer>
    </div>
  );
};

export default NimLayout;
