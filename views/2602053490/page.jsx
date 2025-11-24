"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Layout from "./layout";

const StudentPage = () => {
  // useState — counter
  const [count, setCount] = useState(0);

  // useRef — autofocus input
  const inputRef = useRef(null);

  // API DATA state
  const [fact, setFact] = useState(null);

  // useEffect — run once, fetch API, focus input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();

    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((json) => setFact(json.fact));

    console.log("Component mounted!");
  }, []);

  // useMemo — derived value
  const doubled = useMemo(() => count * 2, [count]);

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.heading}>Jessica Lynn — 2602053490</h1>

        <p style={styles.text}>
          I am a Computer Science student at BINUS University.
          This page demonstrates my understanding of React hooks, Next.js pages,
          layouts, and API integration.
        </p>

        {/* Auto-focused input */}
        <input
          ref={inputRef}
          placeholder="Placeholder"
          style={styles.input}
        />

        {/* Counter demo */}
        <div style={styles.counterBox}>
          <p>Count: {count}</p>
          <p>Doubled (useMemo): {doubled}</p>
          <button
            style={styles.button}
            onClick={() => setCount(count + 1)}
          >
            Increase
          </button>
        </div>

        {/* API data */}
        <div style={styles.apiBox}>
          <h3>Random Cat Fact (API):</h3>
          <p>{fact ?? "Loading..."}</p>
        </div>

        {/* Nested route button */}
        <a href="/2602053490/details" style={styles.link}>
          Go to Details Page →
        </a>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
  },
  heading: {
    color: "#007bff",
  },
  text: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto 20px",
  },
  input: {
    padding: "8px",
    margin: "10px 0",
  },
  counterBox: {
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  apiBox: {
    marginTop: "30px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "6px",
  },
  link: {
    display: "inline-block",
    marginTop: "30px",
    textDecoration: "none",
    color: "#007bff",
    fontSize: "18px",
  },
};

export default StudentPage;
