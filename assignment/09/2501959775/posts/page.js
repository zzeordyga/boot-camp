"use client";

import { useEffect, useState } from "react";
import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(
        collection(db, "posts"),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(data);
          setLoading(false);
        },
        (err) => {
          console.error("Snapshot error:", err);
          setError("Failed to load posts.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("UseEffect error:", err);
      setError("Unexpected error occurred.");
      setLoading(false);
    }
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} style={{ marginBottom: "20px" }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</small>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
