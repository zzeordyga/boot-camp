"use client";

import { useEffect } from "react";

export default function ErrorBoundary({ error, reset }) {
    useEffect(() => {
        console.error("Terjadi error:", error);
    }, [error]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2 style={{ color: '#e74c3c' }}>Oops! Cannot open this page.</h2>
            <p style={{ color: '#555' }}>{error.message}</p>


            <button
                onClick={() => reset()}
                style={{
                    marginTop: '1rem', padding: '10px 20px',
                    backgroundColor: '#3498db', color: 'white',
                    border: 'none', borderRadius: '5px', cursor: 'pointer'
                }}
            >
                Reload
            </button>
        </div>
    );
}
