"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import StudentLayout from "../layout";
import styles from "../styles.module.css";

export default function PostDetailsPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id") || "1";
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPost() {
      try {
        setStatus("loading");
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${encodeURIComponent(postId)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Postingan tidak ditemukan.");

        const data = await response.json();
        if (!data || !data.id) throw new Error("Postingan tidak ditemukan.");
        setPost(data);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Gagal memuat detail.");
          setStatus("error");
        }
      }
    }

    loadPost();
    return () => controller.abort();
  }, [postId]);

  return (
    <StudentLayout>
      <main className={styles.container}>
        <Link href="/2602185210" className={styles.backLink}>
          ← Back to all posts
        </Link>

        {status === "loading" && (
          <div className={styles.message}>Loading article...</div>
        )}
        {status === "error" && (
          <div className={styles.errorBox}>
            <strong>Article unavailable</strong>
            <p>{error}</p>
          </div>
        )}
        {status === "success" && post && (
          <article className={styles.detailCard}>
            <div className={styles.postMeta}>
              <span>ARTICLE DETAIL</span>
              <span>#{String(post.id).padStart(2, "0")}</span>
            </div>
            <p className={styles.eyebrow}>POSTED BY USER {post.userId}</p>
            <h1 className={styles.detailTitle}>{post.title}</h1>
            <p className={styles.detailBody}>{post.body}</p>
            <div className={styles.detailFooter}>
              <span>JSONPlaceholder API</span>
              <span>Post ID: {post.id}</span>
            </div>
          </article>
        )}
      </main>
    </StudentLayout>
  );
}
