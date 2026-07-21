"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const buttonStyle = {
  padding: "5px 10px",
  borderRadius: 5,
  border: "none",
};

export default function MyPage() {

    const router = useRouter();
  const [facts, setFacts] = useState("");

  const handleNavigate = () => {
    router.push(`/2602113691/details?fact=${facts}`)
  }

  const GetNewFact = async (e) => {
    e.preventDefault();
    const res = await fetch("https://catfact.ninja/fact");
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const facts = await res.json();
    setFacts(facts.fact)
  };

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => setFacts(data.fact));
  }, []);

  return (
    <div>
      <h2>Random Facts About Cats</h2>
      <div
        style={{ backgroundColor: "#99a1af", padding: 20, borderRadius: 10 }}
      >
        <p style={{ fontWeight: "bold" }}>Did you know? 🐱</p>
        <p>{facts || 'loading...'}</p>
        <div style={{ display: "flex", gap: 20 }}>
          <button style={buttonStyle} onClick={handleNavigate}>Extras</button>
          <button
            style={buttonStyle}
            onClick={(e) => GetNewFact(e)}
          >
            Get New Fact
          </button>
        </div>
      </div>
    </div>
  );
}
