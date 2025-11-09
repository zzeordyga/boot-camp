"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react'

export default function MyPage() {
    const [count, setCount] = useState(0);
    const paragraphRef = useRef(null);

    useEffect(() => {
        if(paragraphRef.current) {
            paragraphRef.current.style.color = count % 2 === 0 ? "blue" : "green";
        }
    }, [count]);

    const doubled = useMemo (() => count * 2, [count]);

    return (
        <div style ={{
            fontFamily: "Arial, sans-serif",
            padding: "40px",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "12px",
            width: "80%",
            margin: "40px auto",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
        >
            <h1>Agnes Fortuna Fu - 2501973306</h1>
            <p ref={paragraphRef} style={{ fontSize: "18px" }}>
                I am a student of Computer Science Program of Bina Nusantara University. I am studying in the streaming course of Interactive Multimedia.
                I learned many things in many computer language but I found my interest in web development when I'm doing my project assignment.
                I'm learning how to design an interactive web that is user-friendly but still great in functional using HTML, CSS and Javascript.
            </p>

            <div style={{ marginTop: "30px" }}>
                <button onClick={() => setCount(count + 1)}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#007bff",
                        color: "white",
                    }}
                >
                    Click Me 
                </button>

                <p style={{ marginTop: "20px", fontSize:"18px" }}>
                    You clicked <strong>{count}</strong> times.
                </p>
                <p style={{ fontSize: "18px" }}>
                    Doubled value (calculated with <code>useMemo</code>):{" "}
                    <strong>{doubled}</strong>
                </p>
            </div>
        </div>
    );
}

// const MyPage = () => {
//     const [count, setCount] = useState(0);
//     const inputRef = useRef();
//     const doubled = useMemo(() => count * 2, [count]);

//     useEffect(() => {
//         inputRef.current.focus();
//     }, []);

//     return (
//         <div>
//             <h1>Agnes Fortuna Fu - 2501973306</h1>
//             <p>Computer Science</p>
//             <input ref={inputRef} placeholder="Type something..." />
//             <button onClick={() => setCount(count + 1)}>
//                 Click {count} times
//             </button>
//             <p>Doubled: {doubled}</p>
//         </div>
//     );
// };