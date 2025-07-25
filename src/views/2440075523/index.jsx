import React, { useState, useEffect, useRef, useMemo } from 'react';

const StudentPage = () => {
  
  const [counter, setCounter] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  
  const headingRef = useRef(null);
  
 
  useEffect(() => {
    document.title = `Counter: ${counter} | Student Page`;
    
    if (headingRef.current) {
      headingRef.current.focus();
    }
    
    return () => {
      document.title = "React App"; 
    };
  }, [counter]);
  
  
  const introduction = useMemo(() => {
    return `Hello! I'm Valent Setiawan (NIM: 2440075523). 
            I'm studying Computer Science with a focus on Web Development.`;
  }, []);
  
  
  const factorial = useMemo(() => {
    console.log('Calculating factorial');
    let result = 1;
    for (let i = 1; i <= counter; i++) {
      result *= i;
    }
    return result;
  }, [counter]);
  
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  
  const styles = {
    container: {
      backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
      color: isDarkMode ? '#ffffff' : '#333333',
      minHeight: '100vh',
      padding: '2rem',
      transition: 'all 0.3s ease'
    },
    heading: {
      color: isDarkMode ? '#61dafb' : '#007acc'
    },
    button: {
      backgroundColor: isDarkMode ? '#61dafb' : '#007acc',
      color: '#ffffff',
      border: 'none',
      padding: '0.5rem 1rem',
      margin: '0.5rem',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.heading} ref={headingRef} tabIndex="-1">
        Valent Setiawan - 2440075523
      </h1>
      
      <p>{introduction}</p>
      <p>
        My program focuses on modern web technologies including React, Node.js, 
        and database systems. I'm particularly interested in building accessible 
        and performant web applications.
      </p>
      
      <div>
        <h2>Interactive Demo</h2>
        <p>Counter: {counter}</p>
        <p>Factorial: {factorial}</p>
        
        <button style={styles.button} onClick={() => setCounter(c => c + 1)}>
          Increment
        </button>
        
        <button style={styles.button} onClick={() => setCounter(0)}>
          Reset
        </button>
        
        <button style={styles.button} onClick={toggleTheme}>
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

export default StudentPage;