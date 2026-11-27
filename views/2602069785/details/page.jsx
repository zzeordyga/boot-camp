"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "../styles.module.css";

export default function DetailsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id || 1}`
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        setPost(data);
      } catch {
        setError("Unable to load post details.");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  return (
    <main className={styles.detailsContainer}>
      <Link href="/2602069785" className={styles.backLink}>
        ← Back to Dashboard
      </Link>

      {loading ? (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          Loading post details...
        </div>
      ) : error ? (
        <div className={styles.errorBox}>{error}</div>
      ) : post ? (
        <article className={styles.detailCard}>
          <span className={styles.sectionLabel}>POST DETAILS</span>

          <h1>{post.title}</h1>

          <div className={styles.detailMeta}>
            Post #{post.id} · User {post.userId}
          </div>

          <p>{post.body}</p>

          <hr style={{ borderColor: "#293449", margin: "25px 0" }} />

          <p>
            This content is retrieved dynamically from the JSONPlaceholder
            public API using the post ID from the URL.
          </p>
        </article>
      ) : null}
    </main>
  );
}