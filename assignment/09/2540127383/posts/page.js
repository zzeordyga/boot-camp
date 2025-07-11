'use client';

import { useEffect, useState } from 'react';
import getDatabase from '../../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import ErrorBoundary from '../../components/ErrorBoundary';

const db = getDatabase();

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'Posts'), orderBy('createdAt', 'desc'));
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

  return (
    <ErrorBoundary>
      <div style={{ padding: '1rem' }}>
        <h1>📬 Posts</h1>
        <input
          type="text"
          placeholder="Search posts by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        />

        {loading && <p>Loading posts...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {!loading && !error && (
          <ul>
            {filtered.map(post => (
              <li key={post.id} style={{ marginBottom: '1rem' }}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>{post.createdAt?.toDate().toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </ErrorBoundary>
  );
}
