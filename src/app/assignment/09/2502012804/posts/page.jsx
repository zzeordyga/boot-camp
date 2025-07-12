'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import ErrorBoundary from '@/components/ErrorBoundary';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export default function PostsPage() {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const postsCollectionRef = collection(db, 'posts');

    const q = searchTerm
      ? query(postsCollectionRef, where('title', '>=', searchTerm), where('title', '<=', searchTerm + '\uf8ff'))
      : query(postsCollectionRef);


    const unsubscribe = onSnapshot(q, (snapshot) => {
      try {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
        setError(null);
      } catch (err) {
        console.error("Error processing snapshot:", err);
        setError('Failed to process data.');
      } finally {
        setLoading(false);
      }
    }, (err) => {
      console.error("Firebase onSnapshot error:", err);
      setError('Failed to fetch data from Firestore. Please check your connection and configuration.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [searchTerm]);

  return (
    <ErrorBoundary>
      <div style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: 'auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Firestore Posts</h1>

        {/* Search Functionality */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px', fontSize: '16px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Loading State */}
        {loading && <p style={{ textAlign: 'center' }}>Loading posts...</p>}

        {/* Error State */}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>}

        {/* Data Display */}
        {!loading && !error && (
          <div style={{ display: 'grid', gap: '20px' }}>
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', backgroundColor: '#f9f9f9' }}>
                  <h2 style={{ marginTop: 0, color: '#0070f3' }}>{post.title}</h2>
                  <p>{post.content}</p>
                  <small>{post.createdAt && new Date(post.createdAt.seconds * 1000).toLocaleString()}</small>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center' }}>No posts found.</p>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}