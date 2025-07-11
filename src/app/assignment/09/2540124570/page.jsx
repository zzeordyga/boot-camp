"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import ErrorBoundary from "../Component/ErrorBoundary";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdS5OGfRyqxvL05xhW2f8DOSKYP2JvUNA",
  authDomain: "devani-firebase.firebaseapp.com",
  projectId: "devani-firebase",
  storageBucket: "devani-firebase.firebasestorage.app",
  messagingSenderId: "294634998765",
  appId: "1:294634998765:web:5e063d76bbaa52ec6df5e4",
  measurementId: "G-8K3Q265WPH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
const db = getFirestore(app);

const MyPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState("");
  const timeoutRef = useRef(null);

  // Effect untuk debouncing keyword pencarian
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchKeyword(searchKeyword);
    }, 500); // 500ms debounce delay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchKeyword]);

  // Effect untuk fetching data Firestore secara real-time
  useEffect(() => {
    setLoading(true);
    setError(null); // Clear previous errors when a new fetch starts

    const postsCollectionRef = collection(db, "posts");
    let q = query(postsCollectionRef, orderBy("title", "asc"));

    if (debouncedSearchKeyword) {
      q = query(
        postsCollectionRef,
        where("title", ">=", debouncedSearchKeyword),
        where("title", "<=", debouncedSearchKeyword + "\uf8ff"),
        orderBy("title", "asc")
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching real-time posts:", err);
        // FirestoreError: Missing or insufficient permissions will be caught here
        setError("Gagal memuat post: " + err.message); // Menampilkan pesan error dari Firebase
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [debouncedSearchKeyword]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    // Bungkus konten utama dengan ErrorBoundary
    <ErrorBoundary>
      <div
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #eee",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333" }}>
          Firebase Devani Posts
        </h1>

        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={searchKeyword}
          onChange={handleSearchChange}
          style={{
            width: "calc(100% - 20px)",
            padding: "10px",
            marginBottom: "20px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            fontSize: "1em",
          }}
        />

        {/* Kondisi untuk Loading, Error, atau Menampilkan Postingan */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "#555" }}>
            Memuat postingan...
          </div>
        ) : error ? (
          <div
            style={{
              color: "#a30000",
              border: "1px solid #e0b4b4",
              padding: "15px",
              backgroundColor: "#ffe0e0",
              borderRadius: "5px",
              textAlign: "center",
            }}
          >
            Terjadi Kesalahan: {error}
          </div>
        ) : posts.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {posts.map((post) => (
              <li
                key={post.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  backgroundColor: "#fff",
                }}
              >
                <h2 style={{ color: "#0056b3", margin: "0 0 10px 0" }}>
                  {post.title}
                </h2>
                <p style={{ color: "#444", lineHeight: "1.6" }}>
                  {post.content}
                </p>
                {post.createdAt && (
                  <p
                    style={{
                      fontSize: "0.85em",
                      color: "#777",
                      marginTop: "10px",
                      borderTop: "1px dashed #eee",
                      paddingTop: "8px",
                    }}
                  >
                    Dibuat Pada:{" "}
                    {new Date(post.createdAt.seconds * 1000).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: "center", padding: "20px", color: "#555" }}>
            Tidak ada postingan yang ditemukan.
          </p>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MyPage;
