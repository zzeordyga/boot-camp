import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  // useState: manage state
  const [hours, setHours] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // useRef: reference to input element
  const nameInputRef = useRef();

  // useEffect: run on component mount
  useEffect(() => {
    // Focus input when page loads
    nameInputRef.current?.focus();
    
    // Set page title
    document.title = 'Juan Thoriq Pahlevi - 2602232371';
  }, []);

  // useMemo: calculate coffee cups (expensive computation)
  const coffeeCups = useMemo(() => {
    return Math.ceil(hours / 2);
  }, [hours]);

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: darkMode ? '#1a1a2e' : '#f5f5f5',
    color: darkMode ? '#eee' : '#333',
    fontFamily: 'system-ui, sans-serif',
    transition: 'background-color 0.3s',
  };

  const cardStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: darkMode ? '#16213e' : '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
  };

  const inputStyle = {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    width: '100%',
    maxWidth: '300px',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    margin: '0.25rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0066cc',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <h1>Juan Thoriq Pahlevi</h1>
        <p>NIM: 2602232371</p>
        <p>Computer Science - Software Engineering</p>
        
        <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />

        {/* Theme Toggle - demonstrates useState */}
        <button 
          style={buttonStyle}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'} Mode
        </button>

        <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />

        {/* Input with useRef - auto-focus */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Your Name:
          </label>
          <input
            ref={nameInputRef}
            type="text"
            placeholder="Type your name..."
            style={inputStyle}
          />
        </div>

        {/* Coding Hours Tracker - useState */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3>Coding Hours Today: {hours}</h3>
          <button 
            style={buttonStyle}
            onClick={() => setHours(hours + 1)}
          >
            + Add Hour
          </button>
          <button 
            style={buttonStyle}
            onClick={() => setHours(Math.max(0, hours - 1))}
          >
            - Remove Hour
          </button>
          <button 
            style={{...buttonStyle, backgroundColor: '#dc3545'}}
            onClick={() => setHours(0)}
          >
            Reset
          </button>
        </div>

        {/* useMemo - calculated value */}
        <div style={{ 
          padding: '1rem', 
          backgroundColor: darkMode ? '#0f3460' : '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <p>☕ Coffee needed: {coffeeCups} cup{coffeeCups !== 1 ? 's' : ''}</p>
          <small style={{ opacity: 0.7 }}>
            (Calculated using useMemo: 1 cup per 2 hours)
          </small>
        </div>

        {/* Footer */}
        <hr style={{ margin: '1.5rem 0', opacity: 0.2 }} />
        <small style={{ opacity: 0.6 }}>
          React Hooks Used: useState, useEffect, useRef, useMemo
        </small>
      </div>
    </div>
  );
};

export default MyPage;

