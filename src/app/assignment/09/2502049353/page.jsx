"use client";

import { useState, useEffect, useRef } from "react";
import { getFirestore, collection, query, where, onSnapshot, orderBy,} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import ErrorBoundary from "./component/ErrorBoundary";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB1VazHYYd6maePNVVFk_lC10D-tp1IXEo",
  authDomain: "fe-bootcamp-09-2ba5c.firebaseapp.com",
  projectId: "fe-bootcamp-09-2ba5c",
  storageBucket: "fe-bootcamp-09-2ba5c.appspot.com",
  messagingSenderId: "448327163716",
  appId: "1:448327163716:web:cb78f7a4795691b5448111",
  measurementId: "G-PBD75Y5EQ3"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function MyPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceTimer = useRef(null);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(debounceTimer.current);
  }, [search]);

  useEffect(() => {
    const col = collection(db, "posts");
    let q = query(col, orderBy("title", "asc"));

    if (debouncedSearch) {
      q = query(
        col,
        where("title", ">=", debouncedSearch),
        where("title", "<=", debouncedSearch + "\uf8ff"),
        orderBy("title", "asc")
      );
    }

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(docs);
        setLoading(false);
      },
      (err) => {
        setError("🔥 Firestore error: " + err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [debouncedSearch]);

  return (
    <ErrorBoundary>
      <main style={styles.container}>
        <h1 style={styles.title}>Firebase Posts</h1>

        <input
          type="search"
          placeholder="🔍 Cari postingan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {loading ? (
          <p style={styles.info}>⏳ Loading postingan...</p>
        ) : error ? (
          <p style={{ ...styles.info, color: "#ff5c5c" }}>{error}</p>
        ) : posts.length === 0 ? (
          <p style={styles.info}>🙅‍♂️ Tidak ada postingan.</p>
        ) : (
          <div style={styles.postList}>
            {posts.map((post) => (
              <article key={post.id} style={styles.post}>
                <h2 style={styles.postTitle}>{post.title}</h2>
                <p style={styles.postBody}>{post.content}</p>
                {post.createdAt && (
                  <p style={styles.postDate}>
                    Posted {new Date(post.createdAt.seconds * 1000).toLocaleString("id-ID")}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </main>
    </ErrorBoundary>
  );
}

const styles = {
  container: {
    maxWidth: 720,
    margin: "40px auto",
    backgroundColor: "#1f1f1f",
    color: "#f0f0f0",
    padding: "30px",
    borderRadius: "12px",
    fontFamily: "monospace"
  },
  title: {
    fontSize: "2rem",
    marginBottom: 20,
    textAlign: "center",
    color: "#4cc9f0"
  },
  search: {
    width: "100%",
    padding: "12px 14px",
    fontSize: "1em",
    borderRadius: "6px",
    border: "1px solid #555",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    marginBottom: 30
  },
  info: {
    textAlign: "center",
    padding: "20px",
    fontStyle: "italic"
  },
  postList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  post: {
    backgroundColor: "#2a2a2a",
    padding: "20px",
    borderLeft: "5px solid #4cc9f0",
    borderRadius: "8px"
  },
  postTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#90e0ef"
  },
  postBody: {
    lineHeight: 1.5,
    color: "#dee2e6"
  },
  postDate: {
    marginTop: "10px",
    fontSize: "0.85em",
    color: "#adb5bd"
  }
};
