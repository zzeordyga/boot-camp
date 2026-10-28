"use client";

import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import ErrorBoundary from "../../components/ErrorBoundary";
import ErrorFallback from "../../components/ErrorFallback";
import styles from "./posts.module.css";

const SAMPLE_POSTS = [
  {
    title: "Mengenal Firebase",
    content:
      "Firebase adalah platform pengembangan aplikasi dari Google yang menyediakan layanan backend siap pakai untuk aplikasi web dan mobile.",
  },
  {
    title: "Cloud Firestore dan struktur datanya",
    content:
      "Cloud Firestore adalah database NoSQL real-time. Data disimpan dalam collection yang berisi document.",
  },
  {
    title: "Real-time dengan onSnapshot",
    content:
      "Dengan onSnapshot, aplikasi mendengarkan perubahan data dan tampilan ikut diperbarui tanpa perlu memuat ulang halaman.",
  },
];

function toPost(docSnap) {
  const data = docSnap.data();
  return {
    id: docSnap.id,
    title: data.title ?? "",
    content: data.content ?? "",
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : null,
  };
}

function sortNewestFirst(list) {
  return [...list].sort(
    (a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
  );
}

function formatDate(date) {
  if (!date) return "Tanggal tidak tersedia";
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function PostsContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [seeding, setSeeding] = useState(false);
  const [seedError, setSeedError] = useState(null);
  const [simulateCrash, setSimulateCrash] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let unsubscribe = null;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const postsRef = collection(db, "posts");

        const snapshot = await getDocs(postsRef);
        if (cancelled) return;
        setPosts(sortNewestFirst(snapshot.docs.map(toPost)));
        setLoading(false);

        unsubscribe = onSnapshot(
          postsRef,
          (liveSnapshot) => {
            setPosts(sortNewestFirst(liveSnapshot.docs.map(toPost)));
          },
          (err) => setError(err.message)
        );
      } catch (err) {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, [attempt]);

  async function handleSeed() {
    setSeeding(true);
    setSeedError(null);
    try {
      const postsRef = collection(db, "posts");
      for (const post of SAMPLE_POSTS) {
        await addDoc(postsRef, { ...post, createdAt: new Date() });
      }
    } catch (err) {
      setSeedError(err.message);
    } finally {
      setSeeding(false);
    }
  }

  if (simulateCrash) {
    throw new Error("Error simulasi: komponen gagal dirender.");
  }

  const search = keyword.trim().toLowerCase();
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search)
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Posts</h1>
        <p>
          Data dari collection <code>posts</code> di Firestore. Perubahan di
          database langsung muncul di sini.
        </p>
      </header>

      <label htmlFor="search" className={styles.srOnly}>
        Cari post berdasarkan judul
      </label>
      <input
        id="search"
        type="search"
        className={styles.search}
        placeholder="Cari judul post"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={loading || Boolean(error)}
      />

      {loading && (
        <div className={styles.status} role="status">
          <span className={styles.spinner} aria-hidden="true" />
          <span>Memuat data post...</span>
        </div>
      )}

      {!loading && error && (
        <div style={{ marginTop: 20 }}>
          <ErrorFallback
            title="Data post gagal dimuat"
            message={error}
            onRetry={() => setAttempt((n) => n + 1)}
          />
        </div>
      )}

      {!loading && !error && (
        <>
          <p className={styles.count} aria-live="polite">
            Menampilkan {filteredPosts.length} dari {posts.length} post
          </p>

          {posts.length === 0 && (
            <div className={styles.empty}>
              <p>Belum ada post di collection ini.</p>
              <button
                type="button"
                className={styles.button}
                onClick={handleSeed}
                disabled={seeding}
              >
                {seeding ? "Menambahkan..." : "Tambah 3 post contoh"}
              </button>
              {seedError && (
                <p className={styles.formError}>
                  Gagal menambahkan data: {seedError}
                </p>
              )}
            </div>
          )}

          {posts.length > 0 && filteredPosts.length === 0 && (
            <p className={styles.empty}>
              Tidak ada post dengan judul yang mengandung &ldquo;{keyword.trim()}
              &rdquo;.
            </p>
          )}

          {filteredPosts.length > 0 && (
            <ul className={styles.list}>
              {filteredPosts.map((post) => (
                <li key={post.id} className={styles.card}>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardMeta}>{formatDate(post.createdAt)}</p>
                  <p className={styles.cardBody}>{post.content}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <footer className={styles.footer}>
        <button
          type="button"
          className={styles.linkButton}
          onClick={() => setSimulateCrash(true)}
        >
          Simulasikan error render (untuk uji Error Boundary)
        </button>
      </footer>
    </div>
  );
}

export default function PostsPage() {
  return (
    <ErrorBoundary>
      <PostsContent />
    </ErrorBoundary>
  );
}
