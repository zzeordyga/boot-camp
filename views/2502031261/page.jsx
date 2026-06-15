import React, { useState, useEffect, useRef, useMemo } from "react";

const MyPage = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const greeting = useMemo(() => {
    return name.trim() ? `Hello, ${name}!` : "Hello, Student!";
  }, [name]);

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "700px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>Tatras Kennosya Destama Tamri - 2502031261</h1>

      <p>
        Saya adalah mahasiswa Program Studi Mobile Application and Technology yang tertarik pada
        pengembangan web dan teknologi modern menggunakan React.
      </p>

      <hr />

      <h2>React Hooks Demo</h2>

      <div style={{ marginBottom: "16px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Masukkan nama..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "300px",
          }}
        />
      </div>

      <p>{greeting}</p>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Click Me
        </button>

        <p>Button clicked: {count} times</p>
        <p>Doubled value (useMemo): {count * 2}</p>
      </div>
    </div>
  );
};

export default MyPage;