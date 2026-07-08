"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PostCard from "@/components/PostCard";
import FallbackUI from "@/components/FallbackUI";
import ErrorBoundary from "@/components/ErrorBoundary";

function PostsContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(postsQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(
        "Failed to load posts. Please check your Firebase configuration and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <main
      style={{
        maxWidth: 640,
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1>Posts</h1>
      <p style={{ color: "#666" }}>
        Fetched once with <code>getDocs</code>.{" "}
        <Link href="/posts/realtime">See the real-time + search version →</Link>
      </p>

      {loading && <p>Loading posts...</p>}

      {!loading && error && <FallbackUI message={error} onRetry={fetchPosts} />}

      {!loading && !error && posts.length === 0 && (
        <p>No posts found. Try running the seed script (see README).</p>
      )}

      {!loading &&
        !error &&
        posts.map((post) => <PostCard key={post.id} post={post} />)}
    </main>
  );
}

export default function PostsPage() {
  return (
    <ErrorBoundary>
      <PostsContent />
    </ErrorBoundary>
  );
}
