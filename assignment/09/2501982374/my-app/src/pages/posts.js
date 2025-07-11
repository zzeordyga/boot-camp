'use client';

import { useEffect, useState } from 'react';
import getDatabase from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const db = getDatabase();

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    
    return () => unsubscribe();
  }, []);

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
if (loading) return <p>Loading posts…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>All Posts</h1>
      <input
        type="text"
        placeholder="Search by title…"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '0.5rem',
          fontSize: '1rem',
          marginBottom: '1.5rem',
          boxSizing: 'border-box'
        }}
      />

      {filtered.length === 0 ? (
        <p>No posts match "{searchTerm}"</p>
      ) : (
        filtered.map(post => (
          <article
            key={post.id}
            style={{
              padding: '1rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              marginBottom: '1rem'
            }}
          >
            <h2 style={{ margin: '0 0 0.5rem' }}>{post.title}</h2>
            <p style={{ margin: '0 0 0.5rem' }}>{post.content}</p>
            <small style={{ color: '#555' }}>
              {post.createdAt.toDate().toLocaleString()}
            </small>
          </article>
        ))
      )}
    </div>
  );
}

