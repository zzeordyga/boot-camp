"use client";

import ErrorBoundary from "../components/ErrorBoundary";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/config.js";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: any;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      setPosts(postsData);
      setIsLoading(false);
    }, (err) => {
      console.error("Error fetching data: ", err);
      setError("Gagal memuat data. Silakan coba lagi nanti.");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, posts]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ErrorBoundary>
      <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
        <h1>Daftar Posts (Real-time)</h1>
        <input
          type="text"
          placeholder="Cari berdasarkan judul..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
        />
        <ul>
          {filteredPosts.map(post => (
            <li key={post.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', listStyle: 'none' }}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.createdAt && (
                <small style={{ color: '#555' }}>
                  Dibuat pada: {new Date(post.createdAt.seconds * 1000).toLocaleString()}
                </small>
              )}
            </li>
          ))}
        </ul>
      </div>
    </ErrorBoundary>
  );
}