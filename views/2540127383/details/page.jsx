'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DetailsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data));
    }
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Post Detail</h2>

      <div
        style={{
          padding: '1rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          marginBottom: '1rem',
          backgroundColor: '#fff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}
      >
        <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
          Title: {post.title}
        </h3>
        <h4 style={{ fontWeight: '600' }}>Body:</h4>
        <p>{post.body}</p>
      </div>

      <button
        onClick={() => router.back()}
        style={{
          marginTop: '1rem',
          display: 'inline-block',
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          textDecoration: 'none',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>
    </div>
  );
};

export default DetailsPage;