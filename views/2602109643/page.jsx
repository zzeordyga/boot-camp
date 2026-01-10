"use client";

import { useState, useEffect, useRef, useMemo } from "react";

export default function Page() {
  const [fact, setFact] = useState("");
  const [count, setCount] = useState(0);
  const btnRef = useRef(null);

  useEffect(() => {
    fetchFact();
  }, []);

  async function fetchFact() {
    try {
      const res = await fetch("https://catfact.ninja/fact");
      const json = await res.json();
      setFact(json.fact || "No fact");
    } catch (e) {
      setFact("Failed to fetch.");
    }
  }

  const length = useMemo(() => fact.length, [fact]);

  return (
    <div>
      <h1 style={{ fontSize: 22 }}>Cat Facts </h1>
      <p>{fact || "Loading..."}</p>
      <p style={{ color: "#666" }}>Length: {length} chars</p>

      <button
        ref={btnRef}
        onClick={() => {
          setCount((c) => c + 1);
          fetchFact();
        }}
        style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
      >
        Refresh ({count})
      </button>

      <div style={{ marginTop: 16 }}>
        <a href="/2602109643/details">Go to details </a>
      </div>
    </div>
  );
}
