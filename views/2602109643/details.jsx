"use client";

import { useState, useEffect } from "react";

export default function Details() {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((r) => r.json())
      .then((j) => setAdvice(j.slip?.advice || "No advice"))
      .catch(() => setAdvice("Failed to fetch advice"));
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: 20 }}>Random Advice 💡</h2>
      <p>{advice || "Loading..."}</p>

      <div style={{ marginTop: 12 }}>
        <a href="/2602109643"> Back</a>
      </div>
    </div>
  );
}
