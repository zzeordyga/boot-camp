import React, { useState, useEffect, useRef, useMemo } from 'react';

const NAME = 'Alif Arya Ramadhan';
const NIM = '2602157440';
const PROGRAM = 'Software Engineering';

const styles = {
  page: {
    maxWidth: 560,
    margin: '40px auto',
    padding: 24,
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    color: '#1f2937',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
    lineHeight: 1.5,
  },
  heading: { margin: 0, fontSize: 28, color: '#1e3a8a' },
  about: { marginTop: 8, color: '#4b5563' },
  section: {
    marginTop: 20,
    padding: 16,
    background: '#f3f4f6',
    borderRadius: 12,
  },
  label: { display: 'block', marginBottom: 6, fontWeight: 600 },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 12px',
    fontSize: 16,
    border: '1px solid #9ca3af',
    borderRadius: 8,
  },
  row: { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  button: {
    padding: '10px 16px',
    fontSize: 16,
    fontWeight: 600,
    color: '#ffffff',
    background: '#1d4ed8',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
  ghostButton: {
    padding: '10px 16px',
    fontSize: 16,
    fontWeight: 600,
    color: '#1d4ed8',
    background: '#ffffff',
    border: '1px solid #1d4ed8',
    borderRadius: 8,
    cursor: 'pointer',
  },
  small: { margin: '8px 0 0', fontSize: 14, color: '#4b5563' },
};

const MyPage = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const [seconds, setSeconds] = useState(0);
  const inputRef = useRef(null);

  const doubled = useMemo(() => count * 2, [count]);
  const wordCount = useMemo(() => {
    const trimmed = text.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  }, [text]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.title = `${NAME} - ${NIM}`;
  }, []);

  const handleReset = () => {
    setCount(0);
    setText('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>
        {NAME} - {NIM}
      </h1>
      <p style={styles.about}>
        I study {PROGRAM}. The program teaches how to plan, design, build, test,
        and maintain software, from clean code and algorithms to web
        development and teamwork. I am learning to turn ideas into reliable
        applications that people can actually use.
      </p>

      <div style={styles.section}>
        <label htmlFor="notes" style={styles.label}>
          Say something about yourself
        </label>
        <input
          id="notes"
          ref={inputRef}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type something..."
          style={styles.input}
        />
        <p style={styles.small}>
          {text.length} characters, {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </p>
      </div>

      <div style={styles.section}>
        <div style={styles.row}>
          <button
            type="button"
            style={styles.button}
            onClick={() => setCount(count + 1)}
          >
            Click {count} times
          </button>
          <button type="button" style={styles.ghostButton} onClick={handleReset}>
            Reset
          </button>
        </div>
        <p style={styles.small}>Doubled: {doubled}</p>
      </div>

      <p style={styles.small}>You have been on this page for {seconds} seconds.</p>
    </div>
  );
};

export default MyPage;
