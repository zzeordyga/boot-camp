import { useState, useEffect } from 'react';
import { db } from 'lib/firebase';
import { collection, getDocs } from "firebase/firestore";
import ErrorBoundary from 'assigment/09/2440075523/components/ErrorBoundary';
import LoadingSpinner from 'assigment/09/2440075523/components/LoadingSpinner';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
    let unsubscribe;

    try {
      const q = query(collection(db, 'posts'));
      
      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      });

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">Error: {error}</div>;

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <div className="container">
        <h1>Posts</h1>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {filteredPosts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <small>
                  {post.createdAt?.toDate().toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}