"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome</h1>
      <p>Select an assignment to view:</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <button onClick={() => router.push("/2501989462/assignment-8-9")}>
          Assignment 8 - 9
        </button>
        <button onClick={() => router.push("/2501989462/assignment-10")}>
          Assignment 10
        </button>
        <button onClick={() => router.push("/2501989462/assignment-11")}>
          Assignment 11
        </button>
      </div>
    </div>
  );
}
