"use client";

import { useEffect, useState } from "react";
import Layout from "./layout";

export default function DetailsPage() {
  const [advice, setAdvice] = useState(null);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((json) => setAdvice(json.slip.advice));
  }, []);

  return (
    <Layout>
      <h2>Details Page</h2>
      <p>This is the nested route page for Jessica Lynn — 2602053490</p>

      <h3>Random Advice (API):</h3>
      <p>{advice ?? "Loading..."}</p>

      <a href="/2602053490" style={{ color: "#007bff" }}>
        ← Back to Main Page
      </a>
    </Layout>
  );
}
