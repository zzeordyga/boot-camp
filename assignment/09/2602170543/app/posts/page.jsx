"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ErrorBoundary from "@/components/ErrorBoundary";

function PostsContent() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          }));

          setPosts(postsData);
          setFilteredPosts(postsData);
          setLoading(false);
        },
        (err) => {
          console.error("Firestore error:", err);
          setError(
            "Failed to fetch posts. Please check your Firebase configuration."
          );
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Setup error:", err);
      setError("Failed to connect to Firestore. Please check your setup.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchKeyword, posts]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorBox}>
          <h2 style={styles.errorTitle}>❌ Error</h2>
          <p style={styles.errorMessage}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Blog Posts</h1>
      <p style={styles.subtitle}>Real-time updates powered by Firebase</p>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="🔍 Search posts by title..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={styles.searchInput}
        />
        {searchKeyword && (
          <button
            onClick={() => setSearchKeyword("")}
            style={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>

      {searchKeyword && (
        <p style={styles.searchInfo}>
          Found {filteredPosts.length} result
          {filteredPosts.length !== 1 ? "s" : ""} for "{searchKeyword}"
        </p>
      )}

      {filteredPosts.length === 0 ? (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>
            {searchKeyword
              ? "🔍 No posts found matching your search"
              : "📭 No posts yet"}
          </p>
        </div>
      ) : (
        <div style={styles.postsGrid}>
          {filteredPosts.map((post) => (
            <div key={post.id} style={styles.postCard}>
              <h2 style={styles.postTitle}>{post.title}</h2>
              <p style={styles.postContent}>{post.content}</p>
              <p style={styles.postDate}>
                📅{" "}
                {post.createdAt.toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={styles.realtimeIndicator}>
        <span style={styles.realtimeDot}></span>
        <span style={styles.realtimeText}>Live</span>
      </div>
    </div>
  );
}

export default function PostsPage() {
  return (
    <ErrorBoundary>
      <PostsContent />
    </ErrorBoundary>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "10px",
    color: "#111",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: "40px",
    fontSize: "1.1rem",
  },
  searchContainer: {
    position: "relative",
    marginBottom: "30px",
    maxWidth: "600px",
    margin: "0 auto 30px",
  },
  searchInput: {
    width: "100%",
    padding: "15px 45px 15px 20px",
    fontSize: "1rem",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box",
  },
  clearButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "#f0f0f0",
    border: "none",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    fontSize: "14px",
    color: "#666",
  },
  searchInfo: {
    textAlign: "center",
    color: "#0070f3",
    marginBottom: "20px",
    fontSize: "0.95rem",
  },
  postsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
    marginTop: "30px",
  },
  postCard: {
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    padding: "25px",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  },
  postTitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#111",
  },
  postContent: {
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "15px",
    fontSize: "0.95rem",
  },
  postDate: {
    color: "#888",
    fontSize: "0.85rem",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #f0f0f0",
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #f3f3f3",
    borderTop: "5px solid #0070f3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "20px",
    color: "#666",
    fontSize: "1.1rem",
  },
  errorBox: {
    backgroundColor: "#fee",
    border: "2px solid #fcc",
    borderRadius: "12px",
    padding: "40px",
    textAlign: "center",
    maxWidth: "500px",
    margin: "50px auto",
  },
  errorTitle: {
    color: "#c00",
    fontSize: "1.8rem",
    marginBottom: "15px",
  },
  errorMessage: {
    color: "#666",
    fontSize: "1rem",
    marginBottom: "25px",
    lineHeight: "1.6",
  },
  retryButton: {
    padding: "12px 30px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "600",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#999",
  },
  emptyText: {
    fontSize: "1.2rem",
  },
  realtimeIndicator: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "20px",
    padding: "8px 15px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  realtimeDot: {
    width: "8px",
    height: "8px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    animation: "pulse 2s ease-in-out infinite",
  },
  realtimeText: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#22c55e",
  },
};
