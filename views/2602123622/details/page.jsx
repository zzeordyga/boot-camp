"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import styles from "../style.module.css";

export default function DetailsPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setLoading(false);
      });
  }, []);

  const charCount = useMemo(() => {
    return post ? post.body.length : 0;
  }, [post]);

  const wordCount = useMemo(() => {
    return post ? post.body.split(" ").length : 0;
  }, [post]);

  const handleHighlight = () => {
    setHighlight((prev) => !prev);
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className={styles.errorBox}>
        <h2>Error</h2>
        <p>Post not found.</p>
        <Link href="/2602123622">
          <button className={styles.button}>Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.posts}>
      <h2 className={styles.heading}>Post Details</h2>

      <div
        ref={contentRef}
        className={`${styles.card} ${
          highlight ? styles.cardHighlight : ""
        }`}
      >
        <span className={styles.badge}>Post #{post.id}</span>
        <h3 className={styles.cardTitle}>{post.title}</h3>
        <p className={styles.cardText}>{post.body}</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <strong>Characters:</strong> {charCount}
        </div>
        <div className={styles.stat}>
          <strong>Words:</strong> {wordCount}
        </div>
      </div>

      <div className={styles.action}>
        <button onClick={handleHighlight} className={styles.button}>
          {highlight ? "Remove Highlight" : "Highlight"}
        </button>
        <Link href="/2602123622">
          <button className={styles.button}>← Back to Home</button>
        </Link>
      </div>
    </div>
  );
}