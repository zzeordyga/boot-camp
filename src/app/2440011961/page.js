// src/app/2440011961/page.js
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

export default function MyNIMHomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCountRef = useRef(0);
  const memoizedPosts = useMemo(() => posts.filter(post => post.id <= 5), [posts]);

  useEffect(() => {
    fetchCountRef.current += 1;
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px', fontSize: '1.2em', color: '#555' }}>Loading posts...</div>;
  }

  if (error) {
    return <div style={{ color: '#d32f2f', textAlign: 'center', padding: '40px', fontWeight: 'bold' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '0px' }}>
      <h2 style={{ fontSize: '1.8em', marginBottom: '25px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Latest Posts
      </h2>
      <p style={{ fontSize: '0.95em', color: '#666', marginBottom: '15px' }}>
        <span style={{ fontWeight: 'bold' }}>Info:</span> Data fetched {fetchCountRef.current} time(s). Showing first 5 posts for brevity (memoized).
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '25px',
        marginTop: '30px'
      }}>
        {memoizedPosts.map(post => (
          <div key={post.id} style={{
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#0070f3', fontSize: '1.2em' }}>{post.title}</h3>
            <p style={{ fontSize: '0.9em', color: '#555', flexGrow: 1 }}>{post.body.substring(0, 150)}...</p>
            <span style={{ fontSize: '0.8em', color: '#999', marginTop: '10px', alignSelf: 'flex-end' }}>Post ID: {post.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}