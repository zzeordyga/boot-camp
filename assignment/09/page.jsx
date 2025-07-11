'use client';

import { useState, useEffect, useRef } from 'react';
import { collection, query, onSnapshot, orderBy, where, getDocs } from 'firebase/firestore';
import getDb from '../../src/firebase/config'; 
import ErrorBoundary from './components/ErrorBoundary';

function PostsPageContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const db = getDb();
    setLoading(true);

    // Build your query
    let qRef = collection(db, 'posts');
    if (searchTerm) {
      qRef = query(qRef,
        where('title', '>=', searchTerm),
        where('title', '<=', searchTerm + '\uf8ff')
      );
    }
    const orderedQuery = query(qRef, orderBy('createdAt', 'desc'));

    unsubscribeRef.current = onSnapshot(orderedQuery, (snapshot) => {
      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      }));
      setPosts(newPosts);
      setLoading(false);
      setError(null);   
    }, (err) => {
      console.error("Error fetching real-time data: ", err);
      setError("Failed to load posts. Please try again.");
      setLoading(false);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Blog Posts</h1>

        <div style={{ marginBottom: '20px', maxWidth: '400px', margin: '20px auto' }}>
            <form onSubmit={(e) => { e.preventDefault() }}>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            </form>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Loading posts...</div>}
        {error && <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Error: {error}</div>}
        {!loading && !error && posts.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>No posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {posts.map((post) => (
                <div key={post.id} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333' }}>{post.title}</h2>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '15px' }}>{post.content}</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>
                    {post.createdAt.toLocaleDateString()} at {post.createdAt.toLocaleTimeString()}
                </p>
                </div>
            ))}
            </div>
        )}
        </div>
    );
    }   

export default function PostsPage() {
  return (
    <ErrorBoundary fallback={<div style={{ textAlign: 'center', padding: '20px', color: 'red', fontWeight: 'bold' }}>Something went wrong on the posts page. Please refresh.</div>}>
      <PostsPageContent />
    </ErrorBoundary>
  );
}