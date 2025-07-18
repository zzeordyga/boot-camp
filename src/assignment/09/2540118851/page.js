'use client';

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(data);
        setLoading(false);
      }, (err) => {
        console.error("Firestore snapshot error:", err);
        setError("Failed to sync data.");
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const filtered = posts.filter(post =>
      post.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Posts</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: "0.5rem",
          marginBottom: "1rem",
          width: "100%",
          maxWidth: "300px"
        }}
      />

      {filteredPosts.length === 0 ? (
        <p>No matching posts found.</p>
      ) : (
        filteredPosts.map(post => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem"
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>
              {post.createdAt?.seconds
                ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                : 'Unknown date'}
            </small>
          </div>
        ))
      )}
    </div>
  );
}
