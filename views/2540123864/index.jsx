"use client"; 
import React, { useState, useEffect, useRef, useMemo } from 'react';

  const MyPage = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef();
    const incremental = useMemo(() => count + 1, [count]);

    useEffect(() => {
      inputRef.current.focus();
    }, []);

    return (
      <div
        style={{
          fontFamily: "Helvetica",
          padding: "2rem",
          lineHeight: 1.6,
          backgroundColor: "#f9fafb",
          borderRadius: "10px",
          margin: "0 auto",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          color: "black",
          textalign: "center",
      }}>
        <h2>Catherine Natalie - 2540123864</h2>
        <p>Computer Science is a study program where students learn the basics of computing, algorithms, ethics, and various fields such as AI, networks, and multimedia.</p>
        <input style={{ backgroundColor:"#f9fafb", width:"20em", height:"1.5em", color:"black" }} ref={inputRef} placeholder="Type Here!" />
        <br /><br />
        <button onClick={() => setCount(count + 1)}>Click {count} times</button>
        <p>Increment + 1: {incremental}</p>
      </div>
    );
  };

  export default MyPage;
