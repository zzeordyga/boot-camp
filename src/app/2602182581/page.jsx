'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef(null);

    const doubled = useMemo(() => count * 2, [count]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div style={{
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.5'
        }}>
            <h1 style={{ color: '#2563eb' }}>
                Terrence Reinhardt Kanter - 2602182581
            </h1>

            <h2>Computer Science</h2>

            <p>
                I studied Computer Science at BINUS University.
                My interests include front-end development,
                web technologies, and building responsive
                and interactive web applications.
            </p>

            <hr />

            <h2>React Hooks Demonstration</h2>

            <input
                ref={inputRef}
                placeholder="Type something..."
                style={{
                    padding: '10px',
                    marginRight: '10px'
                }}
            />

            <button
                onClick={() => setCount(count + 1)}
                style={{
                    padding: '10px 15px',
                    cursor: 'pointer'
                }}
            >
                Click {count} times
            </button>

            <p>Doubled: {doubled}</p>
        </div>
    );
};

export default MyPage;