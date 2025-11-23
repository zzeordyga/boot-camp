'use client';

import { useEffect, useState, Component } from 'react';
import { db } from './lib/firebase-config'; 
import { collection, onSnapshot } from 'firebase/firestore';

const FallbackUI = ({ error }) => (
  <div style={{ padding: '20px', border: '1px solid red', margin: '20px' }}>
    <h2>Fallback UI</h2>
    <p>Error Cuy</p>
    {process.env.NODE_ENV === 'development' && <details>{error?.message}</details>}
  </div>
);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />;
    }

    return this.props.children; 
  }
}

const PostList = ({ posts, searchTerm, setSearchTerm, status, error }) => {

  const [filteredPosts, setFilteredPosts] = useState([]); 

  useEffect(() => {
    const results = posts.filter(post => {
      const title = post.title || '';
      return title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredPosts(results);
  }, [posts, searchTerm]); 

  if (status === 'loading') {
    return <div>Lagi Loading, Tolong Bersabar</div>;
  }

  return (
    <div>
      <h1>Firestore Connection Status</h1>
      <p>Status: **{status}**</p>
      
      {error && <p style={{ color: 'red' }}>Kenapa??: {error}</p>}

      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginBottom: '20px', width: '300px' }}
      />
      
      <h2>Posts:</h2>
      {filteredPosts.length > 0 ? (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              {post.createdAt ? post.createdAt.toDate().toLocaleString() : 'No Timestamp'}
              {' - '}
              <strong>Title:</strong> {post.title || 'N/A'} with message: {post.content || 'N/A'}
            </li>
          ))}
        </ul>
      ) : (
        <p>Post dulu bos</p>
      )}
    </div>
  );
};

const TestFirestoreConnection = () => {
  const [status, setStatus] = useState('loading'); 
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (querySnapshot) => {
      const fetchedPosts = [];
      querySnapshot.forEach((doc) => {
        fetchedPosts.push({ id: doc.id, ...doc.data() });
      });
      
      setPosts(fetchedPosts); 
      setStatus('Connected'); 
      setError(null);

    }, (err) => {
      console.error('Error listening to collection: ', err);
      setError(err.message);
      setStatus('Failed');
    });

    return () => unsubscribe();
  }, []); 

  return (
    <ErrorBoundary>
        <PostList 
            posts={posts} 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
            status={status} 
            error={error} 
        />
    </ErrorBoundary>
  );
};

export default TestFirestoreConnection;
