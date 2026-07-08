"use client";

export default function FallbackUI({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div
      style={{
        border: "1px solid #f3c2c2",
        backgroundColor: "#fff5f5",
        color: "#8a1f1f",
        borderRadius: 8,
        padding: "1.5rem",
        textAlign: "center",
        maxWidth: 480,
        margin: "2rem auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p style={{ fontSize: "1.5rem", margin: 0 }}>⚠️</p>
      <h3 style={{ margin: "0.5rem 0" }}>Oops!</h3>
      <p style={{ margin: "0 0 1rem 0" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: "#8a1f1f",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
}
