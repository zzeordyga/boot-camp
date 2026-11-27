"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

export default function DevSpacePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const searchRef = useRef(null);

  // Fetch posts from public API
  const fetchPosts = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data.slice(0, 12));
    } catch (error) {
      setError("Failed to load posts. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page loads
  useEffect(() => {
    fetchPosts();
  }, []);

  // Search posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const text = `${post.title} ${post.body}`.toLowerCase();
      return text.includes(search.toLowerCase());
    });
  }, [posts, search]);

  // Focus search input
  const focusSearch = () => {
    searchRef.current?.focus();
  };

  return (
    <main className={styles.container}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span className={styles.greenDot}></span>
            REACT & NEXT.JS DEVELOPER PROJECT
          </div>

          <h1>
            Hi, I'm <span>Rendy.</span>
            <br />
            Welcome to DevSpace.
          </h1>

          <p>
            Welcome to my developer dashboard. Explore posts,
            discover interesting ideas, and learn more about
            my React and Next.js project.
          </p>

          <div className={styles.heroActions}>
            <button
              className={styles.primaryButton}
              onClick={focusSearch}
            >
              Explore Posts →
            </button>

            <Link
              href="/2602069785/details"
              className={styles.secondaryButton}
            >
              About This Project
            </Link>
          </div>

          {/* STUDENT INFORMATION */}
          <div
            style={{
              marginTop: "28px",
              padding: "18px",
              border: "1px solid #293449",
              borderRadius: "12px",
              background: "#111a2b",
              maxWidth: "400px",
            }}
          >
            <p style={{ margin: "5px 0", color: "#cbd5e1" }}>
              <strong>Name:</strong> Rendy Hermawan
            </p>

            <p style={{ margin: "5px 0", color: "#cbd5e1" }}>
              <strong>NIM:</strong> 2602069785
            </p>

            <p style={{ margin: "5px 0", color: "#cbd5e1" }}>
              <strong>Project:</strong> Take-Home Assignment
            </p>
          </div>
        </div>

        {/* HERO CARD */}
        <div className={styles.heroCard}>
          <div className={styles.heroCardTop}>
            <span className={styles.cardLabel}>MY DEVELOPER SPACE</span>
            <span className={styles.liveBadge}>● ONLINE</span>
          </div>

          <div className={styles.heroGraphic}>
            <div
              className={`${styles.graphicCircle} ${styles.circleOne}`}
            ></div>

            <div
              className={`${styles.graphicCircle} ${styles.circleTwo}`}
            ></div>

            <div
              className={`${styles.graphicCircle} ${styles.circleThree}`}
            ></div>

            <div className={styles.graphicCenter}>R</div>
          </div>

          <h3>Rendy's DevSpace</h3>

          <p>Exploring React, Next.js, and web development.</p>

          <div className={styles.heroCardBottom}>
            <span>Student Developer</span>
            <span>2602069785</span>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>POSTS LOADED</span>

          <h2>{posts.length}</h2>

          <p>Data fetched from public API</p>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>TECHNOLOGY</span>

          <h2>React</h2>

          <p>React Hooks & Next.js</p>
        </div>

        <div className={styles.statCard}>
          <span className={styles.statLabel}>API STATUS</span>

          <h2 className={styles.statusText}>
            {loading ? "Loading..." : error ? "Offline" : "Online"}
          </h2>

          <p>JSONPlaceholder API</p>
        </div>
      </section>

      {/* POSTS */}
      <section className={styles.postsSection}>
        <div className={styles.sectionHeading}>
          <div>
            <span className={styles.sectionLabel}>
              EXPLORE THE COMMUNITY
            </span>

            <h2>Latest Posts</h2>

            <p>
              Browse posts retrieved from an external API.
            </p>
          </div>

          <button
            className={styles.refreshButton}
            onClick={fetchPosts}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </div>

        {/* SEARCH */}
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>⌕</span>

          <input
            ref={searchRef}
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          {search && (
            <button
              className={styles.clearSearch}
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Fetching data from API...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className={styles.errorBox}>
            <p>{error}</p>

            <button onClick={fetchPosts}>
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY SEARCH */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No posts found</h3>

            <p>Try using another search keyword.</p>
          </div>
        )}

        {/* POST LIST */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <article
                className={styles.postCard}
                key={post.id}
              >
                <div className={styles.postCardTop}>
                  <span className={styles.postCategory}>
                    COMMUNITY POST
                  </span>

                  <span className={styles.postNumber}>
                    #{String(post.id).padStart(3, "0")}
                  </span>
                </div>

                <h3>{post.title}</h3>

                <p className={styles.postBody}>
                  {post.body}
                </p>

                <div className={styles.postCardBottom}>
                  <div className={styles.author}>
                    <div className={styles.smallAvatar}>
                      {post.userId}
                    </div>

                    <span>User {post.userId}</span>
                  </div>

                  <Link
                    href={`/2602069785/details?id=${post.id}`}
                    className={styles.readMore}
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* RESULT COUNT */}
        {!loading && !error && (
          <div className={styles.resultsInfo}>
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
        )}
      </section>
    </main>
  );
}