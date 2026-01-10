'use client';

import React from 'react';
import Link from 'next/link';

export default function DetailPage() {
  return (
    <div>
      <h2>Detail Page</h2>
      <p>
        Halaman ini adalah nested route dari folder NIM kamu. Kamu bisa gunakan ini untuk
        menampilkan informasi tambahan atau halaman lain yang terhubung dengan halaman utama.
      </p>

      <Link href="/2201792032">
        <button style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#1d4ed8',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          Kembali ke Halaman Utama
        </button>
      </Link>
    </div>
  );
}
