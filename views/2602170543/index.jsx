import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [counter, setCounter] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const textInputRef = useRef();
  
  const calculatedValue = useMemo(() => {
    return {
      square: counter * counter,
      double: counter * 2,
      cube: counter * counter * counter
    };
  }, [counter]);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isTyping]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2c3e50' }}>Eric Tianto - 2602170543</h1>
      <p style={{ color: '#34495e' }}>
        I am a Computer Science student at BINUS University, passionate about web development
        and creating interactive user experiences. Currently focusing on learning React and
        modern JavaScript frameworks.
      </p>
      
      <div style={{ marginTop: '20px' }}>
        <input
          ref={textInputRef}
          type="text"
          placeholder="Type something..."
          onChange={() => setIsTyping(true)}
          style={{
            padding: '8px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #bdc3c7'
          }}
        />
        <span style={{ color: '#7f8c8d' }}>
          {isTyping ? 'Typing...' : ''}
        </span>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => setCounter(prev => prev + 1)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Increment Counter: {counter}
        </button>
        <p style={{ color: '#2c3e50', marginTop: '10px' }}>
          Square of {counter}: {calculatedValue.square}<br />
          Double of {counter}: {calculatedValue.double}<br />
          Cube of {counter}: {calculatedValue.cube}
        </p>
      </div>
    </div>
  );
};

export default MyPage;