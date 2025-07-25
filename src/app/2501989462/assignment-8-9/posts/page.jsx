"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = query(collection(db, "posts"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(fetchedPosts);
        setLoading(false);
      },
      (error) => {
        console.error("Snapshot error:", error);
        setError("Failed to load posts");
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Posts</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filteredPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>
            {post.createdAt && post.createdAt.toDate().toLocaleString("en-US")}
          </small>
        </div>
      ))}
    </div>
  );
}
