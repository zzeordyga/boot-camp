import React, { useState, useEffect, useRef, useMemo } from "react";

const StudentPage = () => {
  // useState — to store a simple counter
  const [count, setCount] = useState(0);

  // useRef — to focus input automatically
  const inputRef = useRef(null);

  // useEffect — run once when component mounts
  useEffect(() => {
    inputRef.current.focus();
    console.log("Component mounted!");
  }, []);

  // useMemo — compute something based on count
  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Jessica Lynn — 2602053490</h1>
      <p style={styles.text}>
        I am a student of the Computer Science program at BINUS University.  
        This page demonstrates my understanding of React components and hooks.
      </p>

      <input
        ref={inputRef}
        placeholder="Placeholder"
        style={styles.input}
      />

      <div style={styles.counterBox}>
        <p>Count: {count}</p>
        <p>Doubled (useMemo): {doubled}</p>
        <button style={styles.button} onClick={() => setCount(count + 1)}>
          Increase
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "40px",
  },
  heading: {
    color: "#007bff",
  },
  text: {
    fontSize: "18px",
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
};

export default StudentPage;
