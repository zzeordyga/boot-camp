"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchPosts, formatPostDate, subscribeToPosts } from "../lib/posts";
import styles from "../app/posts/posts.module.css";

export default function PostsFeed() {
  if (
    typeof window !== "undefined" &&
    window.location.search.includes("simulateError=1")
  ) {
    throw new Error("Simulasi error render untuk menguji ErrorBoundary.");
  }

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchPosts()
      .then((data) => {
        if (!isMounted) return;
        setPosts(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Gagal memuat data posts.");
        setLoading(false);
      });

    const unsubscribe = subscribeToPosts(
      (data) => {
        if (!isMounted) return;
        setPosts(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        if (!isMounted) return;
        setError(err.message || "Gagal menyinkronkan data secara real-time.");
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) return posts;
    return posts.filter((post) =>
      String(post.title || "").toLowerCase().includes(keyword)
    );
  }, [posts, query]);

  return (
    <>
      <input
        type="search"
        className={styles.search}
        placeholder="Cari berdasarkan judul..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Cari post berdasarkan judul"
      />

      {loading && <p className={styles.message}>Memuat posts...</p>}

      {error && (
        <p role="alert" className={styles.error}>
          Terjadi kesalahan: {error}
        </p>
      )}

      {!loading && !error && filteredPosts.length === 0 && (
        <p className={styles.message}>
          {query.trim()
            ? `Tidak ada post dengan judul "${query.trim()}".`
            : "Belum ada post di koleksi Firestore."}
        </p>
      )}

      {!loading && !error && filteredPosts.length > 0 && (
        <div className={styles.list}>
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/detail?id=${post.id}`}
              className={styles.cardLink}
            >
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardDate}>
                  {formatPostDate(post.createdAt)}
                </p>
                <p className={styles.cardContent}>{post.content}</p>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

