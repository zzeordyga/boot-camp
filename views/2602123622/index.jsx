"use client";

import { useState, useEffect, useRef, useMemo } from "react";

import styles from "./style.module.css";

export default function MyPage() {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);
  const doubled = useMemo(() => {
    return count * 2;
  }, [count]);

  useEffect(() => {
    inputRef.current?.focus();

    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=10",
        );

        if (!response.ok) {
          throw new Error("Failed fetching posts");
        }

        const data = await response.json();

        setPosts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (!search.trim()) {
      return posts;
    }

    const keyword = search.toLowerCase();

    return posts.filter((post) => {
      const title = post.title?.toLowerCase() || "";
      const body = post.body?.toLowerCase() || "";
      return title.includes(keyword) || body.includes(keyword);
    });
  }, [posts, search]);

  const totalWords = useMemo(() => {
    return filteredPosts.reduce(
      (total, post) => {
        return total + (post.body?.split(" ").length || 0);
      },

      0,
    );
  }, [filteredPosts]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.posts}>
      <section className={styles.profile}>
        <h1 className={styles.title}>Howen Antonio - 2602123622</h1>
        <p className={styles.subtitle}>Computer Science Student</p>
        <div className={styles.action}>
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Type something..."
          />
          <button
            className={styles.button}
            onClick={() => setCount((prev) => prev + 1)}
          >
            Clicked {count} times
          </button>
        </div>

        <p className={styles.subtitle}>
          Doubled count: <b>{doubled}</b>
        </p>
      </section>

      <section>
        <h2 className={styles.heading}>Posts</h2>
        <div className={styles.searchBox}>
          <input
            className={styles.search}
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className={styles.counter}>{filteredPosts.length} posts</span>
        </div>
      </section>

      <div className={styles.postList}>
        {filteredPosts.map((post) => (
          <article key={post.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{post.title}</h3>
            <p className={styles.cardText}>{post.body}</p>
            <span className={styles.badge}>Post #{post.id}</span>
          </article>
        ))}
      </div>

      <div className={styles.total}>
        Total words: <b>{totalWords}</b>
      </div>
    </div>
  );
}
