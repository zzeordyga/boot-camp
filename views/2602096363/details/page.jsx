"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

export default function DetailsView() {
  const [adviceHistory, setAdviceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchBtnRef = useRef(null);

  const fetchAdvice = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.adviceslip.com/advice?t=${Date.now()}`,
      );
      const data = await res.json();

      if (data.slip) {
        const newSlip = data.slip;
        setAdviceHistory((prev) => {
          if (prev.some((item) => item.id === newSlip.id)) return prev;
          return [newSlip, ...prev];
        });
      }
    } catch (err) {
      console.error("Gagal mengambil data nasihat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  useEffect(() => {
    if (fetchBtnRef.current) {
      fetchBtnRef.current.focus();
    }
  }, []);

  const filteredAdvice = useMemo(() => {
    return adviceHistory.filter((item) =>
      item.advice.toLowerCase().includes(search.toLowerCase()),
    );
  }, [adviceHistory, search]);

  return (
    <div style={styles.container}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/2602096363" style={styles.backLink}>
          ← Kembali ke Dashboard
        </Link>
      </div>

      <h2 style={{ marginTop: 0 }}>
        Random Advice Generator (Advice Slip API)
      </h2>
      <p style={{ color: "#718096", fontSize: "14px" }}>
        Halaman ini mengambil data secara acak dari API Public{" "}
        <code>api.adviceslip.com</code>.
      </p>

      <div style={{ margin: "20px 0" }}>
        <button
          ref={fetchBtnRef}
          onClick={fetchAdvice}
          disabled={loading}
          style={{
            ...styles.button,
            backgroundColor: loading ? "#a0aec0" : "#3182ce",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Memuat Nasihat..." : "🎲 Dapatkan Nasihat Baru"}
        </button>
      </div>

      {adviceHistory.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Cari kata kunci dalam nasihat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />
        </div>
      )}

      <h3>Riwayat Nasihat Terkumpul ({filteredAdvice.length}):</h3>
      {filteredAdvice.length === 0 ? (
        <p style={{ color: "#a0aec0" }}>
          Belum ada nasihat yang cocok dengan pencarian.
        </p>
      ) : (
        <ul style={styles.list}>
          {filteredAdvice.map((item) => (
            <li key={item.id} style={styles.listItem}>
              <span style={styles.slipId}>Advice #{item.id}</span>
              <p style={styles.adviceText}>"{item.advice}"</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "650px",
    margin: "0 auto",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
  backLink: {
    color: "#3182ce",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    boxSizing: "border-box",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "16px",
    backgroundColor: "#f7fafc",
    borderRadius: "8px",
    marginBottom: "12px",
    borderLeft: "4px solid #3182ce",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  slipId: {
    fontSize: "12px",
    color: "#718096",
    fontWeight: "bold",
  },
  adviceText: {
    margin: "6px 0 0",
    fontSize: "16px",
    color: "#2d3748",
    fontStyle: "italic",
  },
};
