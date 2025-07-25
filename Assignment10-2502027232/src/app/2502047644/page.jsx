'use client'
import { useEffect, useMemo, useRef, useState } from "react";

const Index = () => {
  const [counter, setCounter] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const headingRef = useRef(null);

  useEffect(() => {
    console.log(`Counter value changed to: ${counter}`);

    if (headingRef.current) {
      headingRef.current.focus();
    }

    return () => {
      console.log("Component will unmount or counter changed");
    };
  }, [counter]);

  const doubledCounter = useMemo(() => {
    console.log("Calculating doubled counter...");
    return counter * 2;
  }, [counter]);

  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const containerStyle = {
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: isDarkMode ? "#333" : "#f5f5f5",
    color: isDarkMode ? "#fff" : "#333",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  };

  const textStyle = {
    color: isDarkMode ? "#a0d8ff" : "#1a237e",
    transition: "color 0.3s ease",
  };

  const buttonStyle = {
    padding: "8px 16px",
    margin: "5px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: isDarkMode ? "#4CAF50" : "#2E7D32",
    color: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    ":hover": {
      opacity: 0.8,
      transform: "scale(1.05)",
    },
  };

  return (
    <div style={containerStyle}>
      <h1
        ref={headingRef}
        tabIndex="-1"
        style={{
          color: isDarkMode ? "#4CAF50" : "#2E7D32",
          borderBottom: `2px solid ${isDarkMode ? "#4CAF50" : "#2E7D32"}`,
          paddingBottom: "10px",
        }}
      >
        Profile
      </h1>

      <h2 style={textStyle}>Barakhyel Agustorio Gulo</h2>
      <p style={textStyle}>NIM: 2502047644</p>

      <p style={textStyle}>
        Currently studying Computer Science with a focus on Software
        Engineering.
      </p>

      <div style={{ marginBottom: "20px" }}>
        <h3 style={textStyle}>Counter Example (useState)</h3>
        <p style={textStyle}>Current value: {counter}</p>
        <p style={textStyle}>Doubled value (useMemo): {doubledCounter}</p>
        <button style={buttonStyle} onClick={incrementCounter}>
          Increment Counter
        </button>
      </div>

      <div>
        <h3 style={textStyle}>Theme Toggle (useState + useEffect)</h3>
        <button style={buttonStyle} onClick={toggleDarkMode}>
          {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default Index;
