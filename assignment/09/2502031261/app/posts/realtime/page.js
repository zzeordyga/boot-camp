"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PostCard from "@/components/PostCard";
import FallbackUI from "@/components/FallbackUI";
import ErrorBoundary from "@/components/ErrorBoundary";

function RealtimePostsContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    // onSnapshot keeps the UI in sync live: any add/update/delete in the
    // 'posts' collection is pushed to this listener automatically.
    const unsubscribe = onSnapshot(
      postsQuery,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setPosts(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to posts:", err);
        setError(
          "Failed to load real-time posts. Please check your Firebase configuration and try again."
        );
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts or reloadKey changes
    return () => unsubscribe();
  }, [reloadKey]);

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>Posts (Real-time)</h1>
      <p style={{ color: "#666" }}>
        Live-synced with <code>onSnapshot</code>.{" "}
        <Link href="/posts">See the getDocs version →</Link>
      </p>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "0.6rem 0.8rem",
          marginBottom: "1.5rem",
          borderRadius: 6,
          border: "1px solid #ccc",
          boxSizing: "border-box",
        }}
      />

      {loading && <p>Loading posts...</p>}

      {!loading && error && (
        <FallbackUI message={error} onRetry={() => setReloadKey((k) => k + 1)} />
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <p>
          {searchTerm
            ? `No posts match "${searchTerm}".`
            : "No posts found. Try running the seed script (see README)."}
        </p>
      )}

      {!loading &&
        !error &&
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </main>
  );
}

export default function RealtimePostsPage() {
  return (
    <ErrorBoundary>
      <RealtimePostsContent />
    </ErrorBoundary>
  );
}
