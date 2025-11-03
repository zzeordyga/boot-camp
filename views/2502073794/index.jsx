"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function NukyYasuarZamzamy() {
  const [count, setCount] = useState(0);
  const [pressedKey, setPressedKey] = useState("");

  const inputRef = useRef(null);
  const doubled = useMemo(() => count * 2, [count]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPressedKey(event.key.toUpperCase());
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        maxWidth: "600px",
        margin: "auto",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ color: "#007ACC" }}>Nuky Yasuar Zamzamy - 2502073794</h1>

      <p>Computer Science</p>
      {pressedKey}
      <hr style={{ margin: "20px 0" }} />

      <div>
        <p>You clicked the button {count} times.</p>
        <p>
          <strong>Doubled count (useMemo):</strong> {doubled}
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            backgroundColor: "#007ACC",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Click Me
        </button>
        <button
          onClick={() => setCount(0)}
          style={{
            backgroundColor: "#FF5252",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Focus Input (useRef)</h3>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type something..."
          style={{
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginRight: "8px",
          }}
        />
        <button
          onClick={focusInput}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Focus Input
        </button>
      </div>
    </div>
  );
}
