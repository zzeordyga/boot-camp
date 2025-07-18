import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import PostList from '../components/PostList';
import ErrorBoundary from '../components/ErrorBoundary';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const coll = collection(db, 'posts');
    const q = query(coll,
      orderBy('createdAt', 'desc'),
      search ? where('title', '>=', search) : null
    );

    const unsub = onSnapshot(q, snap => {
      const arr = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(arr);
      setLoading(false);
    }, err => {
      console.error(err);
      setError('Failed to fetch posts.');
      setLoading(false);
    });

    return () => unsub();
  }, [search]);

  return (
    <ErrorBoundary fallback={<div>Oops, something went wrong.</div>}>
      <div style={{ padding: 20 }}>
        <h1>Posts</h1>
        <input
          type="text"
          placeholder="Search title…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading && <p>Loading posts…</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <PostList posts={posts} />
      </div>
    </ErrorBoundary>
  );
}
