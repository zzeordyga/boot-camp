"use client";

export default function ErrorFallback({ error, onRetry }) {
  return (
    <div
      role="alert"
      style={{
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #fecaca",
        background: "#fef2f2",
        color: "#991b1b",
        textAlign: "center",
      }}
    >
      <h2 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700 }}>
        Terjadi kesalahan saat menampilkan daftar post
      </h2>
      <p style={{ margin: "0 0 16px", fontSize: "14px" }}>
        {error?.message || "Silakan coba muat ulang komponen ini."}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            background: "#dc2626",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}

