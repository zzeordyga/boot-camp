// assignment/09/<your-NIM>/pages/posts.js

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // Make sure this path is correct relative to posts.js
import ErrorBoundary from '../components/ErrorBoundary'; // Make sure this path is correct relative to posts.js

// --- PostList Component (for displaying filtered posts) ---
// Extracted to keep the main PostsPage component cleaner
function PostList({ posts, searchTerm, loading, error }) {
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Conditional rendering for loading, error, and no results
  if (loading) {
    return <p>Loading posts in real-time...</p>;
  }

  if (error) {
    return <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>;
  }

  if (filteredPosts.length === 0) {
    return <p>No posts found matching your search criteria.</p>;
  }

  return (
    <ul>
      {filteredPosts.map(post => (
        <li key={post.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' }}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.createdAt && (
            <p>
              <small>
                Posted on: {new Date(post.createdAt.toDate()).toLocaleDateString()}
              </small>
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

// --- Main PostsPage Component ---
function PostsPage() {
  // State variables for posts, loading status, error messages, and search term
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook to set up the real-time Firestore listener
  useEffect(() => {
    // Reset states when the effect runs (e.g., on initial mount)
    setLoading(true);
    setError(null);

    // Define the Firestore collection and query
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection, orderBy('createdAt', 'desc')); // Order posts by creation time

    // Set up the real-time listener using onSnapshot
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        // Map document data to an array of post objects, including the document ID
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(fetchedPosts); // Update posts state
        setLoading(false);      // Turn off loading state on successful data fetch
      } catch (err) {
        // Catch errors that might occur during data processing (e.g., malformed data)
        console.error("Error processing real-time posts data:", err);
        setError("Failed to process posts data. Some data might be malformed.");
        setLoading(false); // Turn off loading state on error
      }
    }, (err) => {
      // Catch errors from the onSnapshot listener itself (e.g., permission denied, network issues)
      console.error("Firestore onSnapshot listener error:", err);
      setError("Real-time updates failed. Please check your network connection or Firestore rules.");
      setLoading(false); // Turn off loading state on error
    });

    // Cleanup function: This is crucial for real-time listeners.
    // It unsubscribes from the listener when the component unmounts,
    // preventing memory leaks and unnecessary network usage.
    return () => unsubscribe();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  // Event handler for search input changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // The main rendering logic for the PostsPage component
  return (
    // Wrap the entire component's content with ErrorBoundary
    // This catches JavaScript runtime errors within its children and displays a fallback UI
    <ErrorBoundary>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>Real-time Posts Feed 🚀</h1>

        {/* Search input field */}
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            padding: '10px',
            marginBottom: '20px',
            width: '100%',
            boxSizing: 'border-box',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />

        {/* Render the PostList component, passing all necessary props */}
        <PostList posts={posts} searchTerm={searchTerm} loading={loading} error={error} />
      </div>
    </ErrorBoundary>
  );
}

export default PostsPage;