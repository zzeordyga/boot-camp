'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const NAMA = "Kevin Hermanto";
const NIM = "2602096716";
const PROGRAM_STUDI = "Computer Science";
const BIO = "I am a Computer Science graduate from BINUS University. I have a strong interest in Web Development and Game Development.";

const MyPage = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setMilliseconds(ms => ms + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formattedTime = useMemo(() => {
    const m = String(Math.floor(milliseconds / 60000)).padStart(2, '0');
    const s = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
    const ms = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, '0');
    return `${m}:${s}:${ms}`;
  }, [milliseconds]);

  const handleReset = () => {
    setIsRunning(false);
    setMilliseconds(0);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { height: 100%; overflow: hidden; background-color: #0a1628; }
      `}</style>
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0a1628',
        fontFamily: "'Arial Black', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}>

        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(14,165,233,0.03) 40px, rgba(14,165,233,0.03) 80px)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4rem',
          maxWidth: '900px',
          width: '100%',
          position: 'relative',
        }}>

          {/* Kiri - Hero Section */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>

            <div style={{
              backgroundColor: '#0ea5e9',
              transform: 'skewX(-5deg)',
              padding: '0.4rem 1.5rem',
              marginBottom: '1.2rem',
              boxShadow: '4px 4px 0px #0369a1',
              border: '2px solid #0369a1',
            }}>
              <div style={{ transform: 'skewX(5deg)' }}>
                <div style={{
                  fontSize: '0.65rem',
                  color: '#e0f2fe',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                }}>
                  Student Profile
                </div>
              </div>
            </div>

            <h1 style={{
              color: '#fff',
              fontSize: '2.2rem',
              fontStyle: 'italic',
              margin: '0 0 0.4rem 0',
              textShadow: '3px 3px 0px #0369a1',
              lineHeight: '1.2',
            }}>
              {NAMA}
            </h1>

            <div style={{
              color: '#0ea5e9',
              fontSize: '0.85rem',
              letterSpacing: '3px',
              marginBottom: '1.2rem',
              textTransform: 'uppercase',
            }}>
              {NIM} — {PROGRAM_STUDI}
            </div>

            <div style={{
              width: '40px',
              height: '3px',
              backgroundColor: '#0ea5e9',
              marginBottom: '1.2rem',
            }} />

            <p style={{
              color: '#94a3b8',
              fontSize: '0.95rem',
              lineHeight: '1.8',
              fontFamily: 'Arial, sans-serif',
              fontStyle: 'italic',
              fontWeight: 'normal',
              margin: 0,
            }}>
              {BIO}
            </p>

          </div>

          {/* Kanan - Stopwatch */}
          <div style={{ width: '340px', flexShrink: 0 }}>

            <div style={{
              backgroundColor: '#fff',
              border: '3px solid #0ea5e9',
              boxShadow: '6px 6px 0px #0369a1',
              padding: '1.5rem',
            }}>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1.2rem',
              }}>
                <div style={{
                  width: '12px', height: '12px',
                  backgroundColor: '#0ea5e9',
                  transform: 'rotate(45deg)',
                  flexShrink: 0,
                }} />
                <span style={{
                  color: '#0369a1',
                  fontSize: '0.75rem',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  fontStyle: 'italic',
                }}>
                  Stopwatch
                </span>
              </div>

              <div style={{
                textAlign: 'center',
                fontSize: '2.5rem',
                fontStyle: 'italic',
                color: isRunning ? '#0ea5e9' : '#0f172a',
                letterSpacing: '3px',
                textShadow: isRunning ? '0 0 20px rgba(14,165,233,0.4)' : 'none',
                marginBottom: '1.5rem',
                transition: 'color 0.3s, text-shadow 0.3s',
              }}>
                {formattedTime}
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
              }}>
                <button
                  onClick={() => setIsRunning(r => !r)}
                  style={{
                    backgroundColor: isRunning ? '#94a3b8' : '#0ea5e9',
                    color: '#fff',
                    border: '2px solid #0369a1',
                    padding: '0.6rem 1.5rem',
                    fontFamily: "'Arial Black', sans-serif",
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    transform: 'skewX(-8deg)',
                    boxShadow: '3px 3px 0px #0369a1',
                    transition: 'background 0.2s',
                  }}
                >
                  {isRunning ? 'PAUSE' : 'START'}
                </button>
                <button
                  onClick={handleReset}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#0369a1',
                    border: '2px solid #0369a1',
                    padding: '0.6rem 1.5rem',
                    fontFamily: "'Arial Black', sans-serif",
                    fontStyle: 'italic',
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    cursor: 'pointer',
                    transform: 'skewX(-8deg)',
                    boxShadow: '3px 3px 0px #0369a1',
                    transition: 'border 0.2s',
                  }}
                >
                  RESET
                </button>
              </div>

            </div>

            <div style={{
              backgroundColor: '#0369a1',
              height: '6px',
              transform: 'skewX(-5deg)',
              marginTop: '4px',
              boxShadow: '3px 3px 0px #0c4a6e',
            }} />

          </div>

        </div>
      </div>
    </>
  );
};

export default MyPage;