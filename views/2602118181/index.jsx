import React, { useState, useEffect, useRef, useMemo } from 'react';

const ProfileComponent = () => {
  const [clickCount, setClickCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [advice, setAdvice] = useState(''); // State for storing advice

  const buttonRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);

    if (buttonRef.current) {
      buttonRef.current.focus();
    }

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = `Clicks: ${clickCount} | Time: ${timeSpent}s`;
  }, [clickCount, timeSpent]);

  useEffect(() => {
    const fetchAdvice = async () => {
      try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        setAdvice(data.slip.advice);
      } catch (error) {
        console.error('Error fetching advice:', error);
        setAdvice('Failed to fetch advice. Please try again later.');
      }
    };

    fetchAdvice();
  }, []);

  const expensiveCalculation = useMemo(() => {
    let result = 0;
    for (let i = 0; i < clickCount * 1000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  }, [clickCount]);

  const handleButtonClick = () => {
    setClickCount(prev => prev + 1);
    
    if (buttonRef.current) {
      buttonRef.current.style.backgroundColor = '#10b981';
      setTimeout(() => {
        if (buttonRef.current) {
          buttonRef.current.style.backgroundColor = '#3b82f6';
        }
      }, 200);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          Julio - 2602118181
        </h1>

        <p style={styles.description}>
          I am currently pursuing a degree in Computer Science with a focus on 
          Software Engineering and Web Development. My studies include learning 
          modern frameworks like React, backend development, database management, 
          and software engineering principles. I'm passionate about creating 
          user-friendly applications and solving complex problems through code.
        </p>

        <div style={styles.interactiveSection}>
          <h2 style={styles.subheading}>React Hooks Demonstration</h2>
          
          <div style={styles.statsContainer}>
            <div style={styles.stat}>
              <strong>Time on Page:</strong> {timeSpent} seconds
            </div>
            <div style={styles.stat}>
              <strong>Button Clicks:</strong> {clickCount}
            </div>
            <div style={styles.stat}>
              <strong>Calculation Result:</strong> {expensiveCalculation}
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              ref={buttonRef}
              onClick={handleButtonClick}
              style={styles.button}
            >
              Click Me! (useState + useRef)
            </button>
            
            <button
              onClick={toggleVisibility}
              style={{...styles.button, backgroundColor: '#8b5cf6'}}
            >
              {isVisible ? 'Hide' : 'Show'} Info
            </button>
          </div>

          {isVisible && (
            <div style={styles.infoBox}>
              <h3 style={styles.hookTitle}>Hooks Used:</h3>
              <ul style={styles.hookList}>
                <li><strong>useState:</strong> Managing click count, time, and visibility state</li>
                <li><strong>useEffect:</strong> Timer for tracking time and updating document title</li>
                <li><strong>useRef:</strong> Accessing button DOM element for focus and styling</li>
                <li><strong>useMemo:</strong> Expensive calculation that only runs when click count changes</li>
              </ul>
            </div>
          )}
        </div>

        <div style={styles.adviceSection}>
          <h2 style={styles.subheading}>Random Advice</h2>
          <p style={styles.adviceText}>{advice}</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '1.5rem',
    borderBottom: '3px solid #3b82f6',
    paddingBottom: '0.5rem',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#4b5563',
    marginBottom: '2rem',
    textAlign: 'justify',
  },
  interactiveSection: {
    backgroundColor: '#f9fafb',
    padding: '1.5rem',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
  },
  subheading: {
    fontSize: '1.8rem',
    color: '#374151',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  stat: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '6px',
    textAlign: 'center',
    border: '1px solid #d1d5db',
    fontSize: '0.9rem',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
  },
  hookTitle: {
    fontSize: '1.3rem',
    color: '#374151',
    marginBottom: '1rem',
  },
  hookList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  adviceSection: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#e0f7fa',
    borderRadius: '8px',
    textAlign: 'center',
  },
  adviceText: {
    fontSize: '1.2rem',
    color: '#00796b',
  },
};

export default ProfileComponent;