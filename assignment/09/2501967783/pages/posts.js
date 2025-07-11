import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import ErrorBoundary from "../components/ErrorBoundary";
import '../styles/PostPage.css'

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts"),
      (querySnapshot) => {
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const sortedPosts = postsData.sort(
          (a, b) => b.createdAt.toDate() - a.createdAt.toDate()
        );
        setPosts(sortedPosts);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="container"><div style={{ textAlign: "center", padding: "40px", color: "#666" }}>Loading...</div></div>;
  if (error) return <div className="container"><div style={{ textAlign: "center", padding: "40px", color: "#d32f2f" }}>Error: {error}</div></div>;

  return (
    <ErrorBoundary>
      <div className="container">
        <h1>Posts</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((post) => (
              <li key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p className="created-at">
                  Created at: {post.createdAt.toDate().toLocaleString()}
                </p>
              </li>
            ))}
        </ul>
        {posts.length === 0 && !loading && !error && (
          <p className="no-posts">No posts available.</p>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default PostsPage;