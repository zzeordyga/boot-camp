'use client';
import Link from 'next/link';


const page = () => {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Assignment 10</h1>
      <p>This is a Firebase + Next.js app</p>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/2502000363/login">
          <button style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>Login</button>
        </Link>
        <Link href="/2502000363/register">
          <button style={{ padding: '0.5rem 1rem' }}>Register</button>
        </Link>
      </div>
    </main>
  );
};

export default page;
