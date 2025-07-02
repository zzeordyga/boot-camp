'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const StudentPage = () => {
  // useState example
  const [counter, setCounter] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  
  // useRef example
  const headingRef = useRef(null);
  
  // useEffect example
  useEffect(() => {
    console.log('Component mounted or updated');
    headingRef.current.style.color = darkMode ? '#ffffff' : '#000000';
    
    return () => {
      console.log('Component will unmount');
    };
  }, [darkMode]);
  
  // useMemo example
  const doubledCounter = useMemo(() => {
    console.log('Calculating doubled counter');
    return counter * 2;
  }, [counter]);
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: darkMode ? '#222222' : '#f5f5f5',
      minHeight: '100vh',
      color: darkMode ? '#ffffff' : '#000000'
    }}>
      <h1 ref={headingRef}>Student Information</h1>
      
      <h2>Name: Valent Setiawan</h2>
      <h3>NIM: 2440075523</h3>
      
      <p>
        I'm studying Computer Science with a focus on web development. 
        This program combines theoretical knowledge with practical skills 
        to prepare students for modern software development challenges.
      </p>
      
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setCounter(c => c + 1)}>
          Increment Counter
        </button>
        <span style={{ margin: '0 10px' }}>Count: {counter}</span>
        <span>Doubled: {doubledCounter}</span>
      </div>
      
      <button onClick={() => setDarkMode(prev => !prev)}>
        Toggle Dark Mode
      </button>
      
      <p>Last rendered: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default StudentPage;
