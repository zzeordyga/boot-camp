"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import StudentLayout from "./layout";
import styles from "./styles.module.css";

export default function AntonDashboardPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        setStatus("loading");
        setError("");
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }

        const data = await response.json();
        setPosts(data);
        setStatus("success");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Terjadi kesalahan.");
          setStatus("error");
        }
      }
    }

    loadPosts();
    return () => controller.abort();
  }, []);

  const filteredPosts = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) return posts;

    return posts.filter((post) =>
      `${post.title} ${post.body} ${post.id}`
        .toLowerCase()
        .includes(keyword)
    );
  }, [posts, search]);

  function focusSearch() {
    searchRef.current?.focus();
  }

  return (
    <StudentLayout>
      <main className={styles.container}>
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>PERSONAL WORKSPACE</p>
            <h1>Discover great <span>stories.</span></h1>
            <p className={styles.heroText}>
              Jelajahi kumpulan postingan dari API publik. Cari artikel dan buka
              detailnya dalam satu dashboard.
            </p>
            <button className={styles.primaryButton} onClick={focusSearch}>
              Explore posts <span aria-hidden="true">↗</span>
            </button>
          </div>
          <div className={styles.heroCard} aria-label="Dashboard statistics">
            <span className={styles.heroCardLabel}>TOTAL ARTICLES</span>
            <strong>{status === "success" ? posts.length : "—"}</strong>
            <span className={styles.heroCardCaption}>JSONPlaceholder collection</span>
            <div className={styles.heroOrb} />
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>THE COLLECTION</p>
              <h2>Latest posts</h2>
            </div>
            <span className={styles.resultCount}>
              {filteredPosts.length} articles
            </span>
          </div>

          <label className={styles.searchBox}>
            <span aria-hidden="true">⌕</span>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search by title, content, or ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search posts"
            />
            {search && (
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>

          {status === "loading" && (
            <div className={styles.message}>Loading posts...</div>
          )}

          {status === "error" && (
            <div className={styles.errorBox}>
              <strong>Oops, data belum bisa dimuat.</strong>
              <p>{error}</p>
              <button
                className={styles.secondaryButton}
                onClick={() => window.location.reload()}
              >
                Try again
              </button>
            </div>
          )}

          {status === "success" && filteredPosts.length === 0 && (
            <div className={styles.message}>
              Tidak ada postingan yang cocok dengan “{search}”.
            </div>
          )}

          {status === "success" && filteredPosts.length > 0 && (
            <div className={styles.postGrid}>
              {filteredPosts.map((post) => (
                <article className={styles.postCard} key={post.id}>
                  <div className={styles.postMeta}>
                    <span>ARTICLE</span>
                    <span>#{String(post.id).padStart(2, "0")}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <Link
                    className={styles.readMore}
                    href={`/2602185210/details?id=${post.id}`}
                  >
                    Read article <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </StudentLayout>
  );
}
