import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0) {
      document.title = `You clicked ${count} times`;
    }
  }, [count]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#f1f1f1" : "#121212";
  }, [darkMode]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        minHeight: "100vh",
        paddingTop: "60px",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {}
      <h1 style={{ marginBottom: "10px" }}>
        Muhammad Rafliansyah - 2502025340
      </h1>

      {}
      <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        I am a Computer Science student from Bina Nusantara University,
        Computer science is the study of computers and computational systems.
        A Front-End Developer is someone who creates websites and web applications.
      </p>

      {}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          backgroundColor: darkMode ? "#f1f1f1" : "#121212",
          color: darkMode ? "#121212" : "#f1f1f1",
          padding: "10px 10px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <br />

      {}
      <button
        onClick={() => setCount(count + 1)}
        style={{
          backgroundColor: darkMode ? "#333" : "#0070f3",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
        }}
      >
        Click Me!
      </button>

      <p style={{ marginTop: "20px", fontSize: "16px" }}>
        You clicked {count} times.
      </p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);