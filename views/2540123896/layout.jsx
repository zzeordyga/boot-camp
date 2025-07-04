import React from "react";

export default function Layout({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 60%, #e3f2fd 100%)",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif",
      padding: 0,
      margin: 0,
    }}>
      <header style={{
        background: "#1a237e",
        color: "#fff",
        padding: "1.5rem 0",
        textAlign: "center",
        fontWeight: 700,
        fontSize: "1.5rem",
        letterSpacing: 1,
      }}>
        Bintang Satria Khanafi - 2540123896
      </header>
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "2rem 1rem" }}>
        {children}
      </main>
    </div>
  );
}