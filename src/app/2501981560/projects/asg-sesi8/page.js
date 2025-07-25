"use client";
import '../../2501981560.css';

import { useState, useEffect, useRef, useMemo } from "react";
import axios from 'axios';

const AdvicePage = () => {
  const [advice, setAdvice] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);
  const fetchCountRef = useRef(0);

  useEffect(() => {
    const fetchAdvice = async () => {
      const res = await axios.get("https://api.adviceslip.com/advice");
      const data = res.data.slip.advice;
      
      setAdvice(data);
      fetchCountRef.current += 1;

    };
    fetchAdvice();
  }, [refreshCount]);

  const formattedAdvice = useMemo(() => {
    console.log("Changing advice");
    return `💡 "${advice}" 💡`;
  }, [advice]);

  const handleNewAdvice = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Advice Generator</h1>
      <p style={styles.adviceText}>{formattedAdvice}</p>
      <button
        style={styles.button}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = styles.button.backgroundColor;
        }}
        onClick={handleNewAdvice}
      >
        Get New Advice
      </button>
      <p style={styles.countText}>
        You have fetched advice <strong>{fetchCountRef.current}</strong> times.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '2rem',
  },
  heading: {
    fontSize: '1.875rem', 
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  adviceText: {
    fontSize: '1.25rem', 
    textAlign: 'center',
    marginBottom: '0.5rem',
  },
  button: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: 'none',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#2563EB',
  },
  countText: {
    marginTop: '1rem',
    fontSize: '0.875rem', 
    color: '#6B7280', 
  },
};

export default AdvicePage;