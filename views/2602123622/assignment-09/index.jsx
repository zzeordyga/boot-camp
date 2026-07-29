"use client";

import { useState, useEffect, Component } from "react";
import { db } from "../../../firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import styles from ".//index.module.css";

function ErrorFallback({ error, onReset }) {
  return (
    <div className={styles.center}>
      <div className={styles.errorBox}>
        <p className={styles.errorTitle}>Something went wrong</p>

        <p className={styles.errorText}>{error?.message}</p>

        <button onClick={onReset} className={styles.button}>
          Try again
        </button>
      </div>
    </div>
  );
}

class PostsErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Posts Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={() =>
            this.setState({
              hasError: false,
              error: null,
            })
          }
        />
      );
    }

    return this.props.children;
  }
}

function PostsApp() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [seeding, setSeeding] = useState(false);

  const seedSampleData = async () => {
    setSeeding(true);

    try {
      const samplePosts = [
        {
          title: "Getting Started with Firebase",

          content:
            "Learn how to set up Firebase in your React app and connect it to Firestore. Collections organize your data and allow you to query based on fields.",

          createdAt: serverTimestamp(),
        },

        {
          title: "Real-time Data with Firestore",

          content:
            "Firestore onSnapshot enables real-time updates across all connected clients. It is perfect for collaborative apps, chat applications, and live dashboards.",

          createdAt: serverTimestamp(),
        },

        {
          title: "React Error Boundaries",

          content:
            "Error Boundaries catch JavaScript errors in component trees, log those errors, and display a fallback UI instead of crashing the whole application.",

          createdAt: serverTimestamp(),
        },
      ];

      for (const post of samplePosts) {
        await addDoc(collection(db, "posts"), post);
      }
    } catch (err) {
      console.error("Failed to seed:", err);
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    let unsubscribe;

    const fetchInitialData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();

    unsubscribe = onSnapshot(
      collection(db, "posts"),

      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
        setError(null);
      },

      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title && post.title.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = (timestamp) => {
    if (!timestamp) return "Just now";

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);

    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className={styles.center}>
        <div>
          <div className={styles.spinner}></div>

          <p className={styles.loadingText}>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <div className={styles.errorBox}>
          <p className={styles.errorTitle}>Failed to load posts</p>

          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search posts by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />

        <button
          onClick={seedSampleData}
          disabled={seeding}
          className={styles.button}
        >
          {seeding ? "Seeding..." : "Seed Sample Data"}
        </button>
      </div>

      {filteredPosts.length === 0 ? (
        <div className={styles.empty}>
          <h3>No posts found</h3>

          <p>Try seeding sample data.</p>
        </div>
      ) : (
        <div>
          {filteredPosts.map((post) => (
            <div key={post.id} className={styles.card}>
              <h3 className={styles.title}>{post.title}</h3>

              <p className={styles.content}>{post.content}</p>

              <p className={styles.date}>{formatDate(post.createdAt)}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        Total posts visible:
        <strong> {filteredPosts.length}</strong>
      </div>
    </div>
  );
}

export default function Assignment09() {
  return (
    <PostsErrorBoundary>
      <PostsApp />
    </PostsErrorBoundary>
  );
}
