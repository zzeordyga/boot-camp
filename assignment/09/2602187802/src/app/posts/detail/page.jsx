"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ErrorBoundary from "../../../components/ErrorBoundary";
import { fetchPostById, formatPostDate } from "../../../lib/posts";
import styles from "../posts.module.css";

function PostDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    fetchPostById(id)
      .then((data) => {
        if (!isMounted) return;
        setPost(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || "Gagal memuat detail post.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <p className={styles.message}>Memuat detail post...</p>;
  }

  if (error) {
    return (
      <p role="alert" className={styles.error}>
        Terjadi kesalahan: {error}
      </p>
    );
  }

  if (!id || !post) {
    return <p className={styles.message}>Post tidak ditemukan.</p>;
  }

  return (
    <article className={styles.card}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.cardDate}>{formatPostDate(post.createdAt)}</p>
      <p className={styles.cardContent}>{post.content}</p>
    </article>
  );
}

export default function PostDetailPage() {
  return (
    <main className={styles.container}>
      <Link href="/posts" className={styles.backLink}>
        ← Kembali ke Daftar Posts
      </Link>
      <ErrorBoundary>
        <Suspense fallback={<p className={styles.message}>Memuat detail post...</p>}>
          <PostDetailContent />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

