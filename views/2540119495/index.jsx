import { useState, useEffect, useRef, useMemo } from "react";
import Layout from "./layout";
import Link from "next/link";

export default function MainPage() {
  const [fact, setFact] = useState(null);
  const countRef = useRef(0);

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => setFact(data.fact));
  }, []);

  const factLength = useMemo(() => fact?.length ?? 0, [fact]);

  return (
    <Layout>
      <p>
        <strong>Cat Fact:</strong> {fact || "Loading..."}
      </p>
      <p>Fact length (memoized): {factLength}</p>
      <p>Render count: {++countRef.current}</p>
      <Link href="/12345678/details">Go to Details</Link>
    </Layout>
  );
}
