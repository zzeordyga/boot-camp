'use client'
// Posts Page - Main component with real-time Firebase data
// This page fetches and displays posts from Firestore with search functionality

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import PostCard from './components/PostCard';
import SearchBar from './components/SearchBar';
import ErrorBoundary from './components/ErrorBoundary';

export default function PostsPage() {
  // State management
  const [posts, setPosts] = useState([]);           // All posts from Firestore
  const [loading, setLoading] = useState(true);     // Loading state
  const [error, setError] = useState(null);         // Error state
  const [searchTerm, setSearchTerm] = useState(''); // Search input

  // useEffect - Set up real-time listener when component mounts
  useEffect(() => {
    try {
      // Create a query to get posts ordered by creation date (newest first)
      const postsQuery = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc')
      );

      // onSnapshot listens for real-time changes in the collection
      // This means whenever data changes in Firebase, our UI updates automatically!
      const unsubscribe = onSnapshot(
        postsQuery,
        (snapshot) => {
          // Map through documents and convert to array of post objects
          const postsData = snapshot.docs.map(doc => ({
            id: doc.id,           // Document ID
            ...doc.data()         // All fields from the document
          }));

          setPosts(postsData);    // Update state with new data
          setLoading(false);       // Data loaded, stop loading
          setError(null);          // Clear any previous errors
        },
        (err) => {
          // If there's an error fetching data
          console.error('Error fetching posts:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      // Cleanup function - unsubscribe when component unmounts
      // This prevents memory leaks
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []); // Empty dependency array = run once on mount

  // Filter posts based on search term
  // This runs every time posts or searchTerm changes
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading State - Show while fetching data
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '6px solid #e5e7eb',
            borderTop: '6px solid #16a34a',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ fontSize: '18px', color: '#6b7280' }}>
            Loading posts...
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error State - Show if something went wrong
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f9fafb',
        padding: '20px'
      }}>
        <div style={{
          background: '#fee',
          padding: '32px',
          borderRadius: '12px',
          maxWidth: '500px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#c00', marginBottom: '16px' }}>
            ❌ Error Loading Posts
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#16a34a',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Main UI - Display posts
  return (
    <ErrorBoundary>
      <div style={{
        minHeight: '100vh',
        background: '#f9fafb',
        padding: '32px 16px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Header */}
          <header style={{
            marginBottom: '32px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '8px'
            }}>
              📝 Firebase Posts
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#6b7280'
            }}>
              Real-time data from Firestore | Juan Thoriq Pahlevi - 2602232371
            </p>
          </header>

          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Posts Count */}
          <div style={{
            marginBottom: '20px',
            padding: '12px 16px',
            background: '#e0f2fe',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#0369a1'
          }}>
            {filteredPosts.length === posts.length ? (
              <span>📊 Showing all {posts.length} posts</span>
            ) : (
              <span>
                🔍 Found {filteredPosts.length} of {posts.length} posts
              </span>
            )}
          </div>

          {/* Posts Grid or Empty State */}
          {filteredPosts.length === 0 ? (
            <div style={{
              background: 'white',
              padding: '60px 32px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                {searchTerm ? '🔍' : '📭'}
              </div>
              <h3 style={{
                fontSize: '24px',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                {searchTerm ? 'No posts found' : 'No posts yet'}
              </h3>
              <p style={{ color: '#6b7280' }}>
                {searchTerm
                  ? `Try searching for something else`
                  : 'Add some posts to Firestore to see them here!'}
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '24px'
            }}>
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
