"use client";

export default function Error({ error, reset }) {
  return (
    <div style={{ padding: "40px" }}>
      <h2>Unable to load World Cup news. Please try again.</h2>

      <p>{error.message}</p>

      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
