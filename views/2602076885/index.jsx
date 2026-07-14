import { useState, useEffect } from "react";

export default function KevinProfile() {
  const [likes, setLikes] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const now = new Date();
    setCurrentTime(now.toLocaleString());
  }, []);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Hello, I'm Kevins 👋</h1>

      <h2>NIM: 2602076885</h2>

      <p>
        Page ini tidak bisa tampil. Pakai yang di src/app/2602076885/page.jsx.
      </p>

      <h3>My Hobbies</h3>

      <ul>
        <li>🚗 Automotive</li>
        <li>💻 Technology</li>
        <li>🎮 Gaming</li>
        <li>⚽ Sports</li>
      </ul>

      <hr />

      <p>
        <strong>Page opened at:</strong> {currentTime}
      </p>

      <button
        onClick={() => setLikes(likes + 1)}
        style={{
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        👍 Like ({likes})
      </button>
    </div>
  );
}
