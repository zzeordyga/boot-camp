import React from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link href="/2540130296">Home</Link> |{' '}
        <Link href="/2540130296/details">Details</Link>
      </nav>
      <main>{children}</main>
    </div>
  );
}