"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export default function PostsPage() {


  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");


  useEffect(() => {
    console.log("Starting Firestore listener...");

    const postsCollection = collection(db, "posts");

    const unsubscribe = onSnapshot(
      postsCollection,
      (snapshot) => {
        console.log("Firestore snapshot received!");
        console.log("Snapshot size:", snapshot.size);
        console.log(
          "Document IDs:",
          snapshot.docs.map((doc) => doc.id)
        );

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Posts updated:", postsData);

        setPosts(postsData);
        setLoading(false);
        setError("");
        setConnectionStatus("Connected");
      },
      (listenerError) => {
        console.error("Firestore listener error:", listenerError);

        setError(
          listenerError.message ||
            "Unable to load posts. Please try again later."
        );

        setLoading(false);
        setConnectionStatus("Connection failed");
      }
    );

    return () => {
      console.log("Unsubscribing from Firestore...");
      unsubscribe();
    };
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="posts-container">
      <header className="posts-header">
        <div className="posts-label">FIREBASE + NEXT.JS</div>

        <h1>Real-Time Posts</h1>

        <p>
          Explore posts stored in Firebase Firestore.
          Updates appear automatically.
        </p>

        <div className="connection-status">
          <span
            className={`status-dot ${
              connectionStatus === "Connected"
                ? "connected"
                : connectionStatus === "Connection failed"
                ? "failed"
                : "pending"
            }`}
          ></span>

          {connectionStatus}
        </div>
      </header>

      <section className="posts-search">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search posts by title"
        />
      </section>

      {loading && (
        <div className="posts-status">
          <div className="spinner"></div>
          <p>Loading posts...</p>
        </div>
      )}

      {!loading && error && (
        <div className="posts-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="posts-count">
            {filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"} found
          </div>

          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <h2>No posts found</h2>

              <p>
                {search
                  ? "Try searching with another keyword."
                  : "There are no posts available yet."}
              </p>
            </div>
          ) : (
            <section className="posts-grid">
              {filteredPosts.map((post) => (
                <article className="post-card" key={post.id}>
                  <div className="post-card-top">
                    <span className="post-badge">POST</span>
                  </div>

                  <h2>{post.title}</h2>

                  <p className="post-content">{post.content}</p>

                  <div className="post-date">
                    {post.createdAt?.toDate
                      ? post.createdAt.toDate().toLocaleString()
                      : "Date unavailable"}
                  </div>
                </article>
              ))}
            </section>
          )}
        </>
      )}

      <footer className="posts-footer">
        Powered by Next.js & Firebase Firestore
      </footer>
    </main>
  );
}