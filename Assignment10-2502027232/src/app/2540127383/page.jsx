'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  // useState hook
  const [count, setCount] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [theme, setTheme] = useState('light');

  // useRef hook
  const inputRef = useRef();
  const countDisplayRef = useRef();

  // useMemo hook
  const doubled = useMemo(() => count * 2, [count]);
  const inputWordCount = useMemo(() => {
    return userInput.trim().split(' ').filter(word => word.length > 0).length;
  }, [userInput]);

  // useEffect hook
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
    
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  useEffect(() => {
    if (countDisplayRef.current) {
      countDisplayRef.current.style.transform = 'scale(1.2)';
      const timer = setTimeout(() => {
        if (countDisplayRef.current) {
          countDisplayRef.current.style.transform = 'scale(1)';
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleReset = () => {
    setCount(0);
    setUserInput('');
    inputRef.current.focus();
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: theme === 'light' ? '#ffffff' : '#2d3748',
    color: theme === 'light' ? '#2d3748' : '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease'
  };

  const buttonStyle = {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const inputStyle = {
    width: '80%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    fontSize: '16px',
  };

  const countDisplayStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4299e1',
    transition: 'transform 0.2s ease'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
        Angeline Despiadi - 2540127383
      </h1>
      <p style={{ textAlign: 'center', fontSize: '14px', marginBottom: '30px' }}>
        I have graduated with a degree in Computer Science with a specialization in Software Engineering. This program focused on building a strong foundation in algorithms, data structures, and computer systems, while also emphasizing software development principles, design patterns, and project management.
      </p>

      <div style={{ marginBottom: '20px' }}>
        <h3>Interactive Counter</h3>
        <div ref={countDisplayRef} style={countDisplayStyle}>
          Count: {count}
        </div>
        <p>Doubled value: {doubled}</p>
        <button 
          style={buttonStyle}
          onClick={() => setCount(count + 1)}
        >
          Increment Counter
        </button>
        <button 
          style={{...buttonStyle, backgroundColor: '#e53e3e'}}
          onClick={handleReset}
        >
          Reset All
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Text Input with Word Counter</h3>
        <input
          ref={inputRef}
          style={inputStyle}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type something here..."
        />
        <p>Word count: {inputWordCount}</p>
        <p>Character count: {userInput.length}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Theme Toggle</h3>
        <p>Current theme: <strong>{theme}</strong></p>
        <button 
          style={{...buttonStyle, backgroundColor: '#805ad5'}}
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
};

export default MyPage;
