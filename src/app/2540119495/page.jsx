'use client'
import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from "react-dom/client";

const index = () => {
  const [clicks, setClicks] = useState(0);
  const paragraphRef = useRef(null);

  useEffect(() => {
    console.log(`Component mounted. Current click count: ${clicks}`);
    paragraphRef.current.style.color = "blue";
  }, []);

  useEffect(() => {
    if (clicks > 0) {
      console.log(`You clicked ${clicks} times`);
    }
  }, [clicks]);

  const doubleClicks = useMemo(() => {
    return clicks * 2;
  }, [clicks]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Jahnsen - 2540119495</h1>
      <p ref={paragraphRef}>
        I am currently studying Computer Science. I am passionate about web
        development, especially using modern frameworks like React.js.
      </p>
      <button onClick={() => setClicks(clicks + 1)} style={styles.button}>
        Click Me
      </button>
      <p>You have clicked {clicks} times.</p>
      <p>Double click value (via useMemo): {doubleClicks}</p>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    textAlign: "center",
  },
  heading: {
    color: "#4CAF50",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "16px",
    marginTop: "1rem",
    cursor: "pointer",
  },
};

export default index;
