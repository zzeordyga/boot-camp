"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

export default function ProfilePage() {
  // useState
  const [clickCount, setClickCount] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [visitTime, setVisitTime] = useState("");

  // useRef
  const headingRef = useRef(null);

  const name = "Calvin Christian Ho";
  const nim = "2602103904";
  const major = "Computer Science";

  const skills = ["Laravel", "HTML", "Tailwind CSS", "JavaScript", "MySQL"];

  // useEffect
  useEffect(() => {
    setVisitTime(new Date().toLocaleString());

    if (headingRef.current) {
      headingRef.current.style.transition = "0.3s";
    }
  }, []);

  // useMemo
  const profileSummary = useMemo(() => {
    return `${name} | ${nim} | ${major}`;
  }, [name, nim, major]);

  const showImage = clickCount >= 10;

  const pageStyle = {
    minHeight: "100vh",
    backgroundColor: darkMode ? "#1f2937" : "#f5f5f5",
    color: darkMode ? "#ffffff" : "#111827",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    transition: "0.3s",
  };

  const cardStyle = {
    backgroundColor: darkMode ? "#374151" : "#ffffff",
    padding: "30px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "600px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    textAlign: "center",
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "5px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Heading */}
        <h1 ref={headingRef}>{name}</h1>
        <h2>{nim}</h2>

        {/* Deskripsi Program Studi */}
        <p>
          I'm major in <strong>{major}</strong> who likes to code and make a
          website I think :3
        </p>

        <hr style={{ margin: "20px 0" }} />

        {/* useMemo */}
        <h3>Profile</h3>
        <p>{profileSummary}</p>

        <hr style={{ margin: "20px 0" }} />

        {/* Skills */}
        <h3>Skills</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "8px 14px",
                borderRadius: "20px",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        <hr style={{ margin: "20px 0" }} />

        {/* useState Counter */}
        <h3>Your Interaction</h3>
        <p>Number of times you've clicked my button 🤨: {clickCount}</p>
        {showImage && (
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnR4ZHZ1YnB0MjVhc2pjZmpjMHpxOGU0aDhxMXQ0aHhvdng3bnNpaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QsgJi30B9ByH7tRhGV/giphy.gif"
            alt="just_an_images"
            style={{
              position: "fixed",
              inset: 0,
              width: "100vw",
              height: "100vh",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
        )}

        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#22c55e",
            color: "white",
          }}
          onClick={() => setClickCount(clickCount + 1)}
        >
          Don't Click Me
        </button>

        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#6366f1",
            color: "white",
          }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        <hr style={{ margin: "20px 0" }} />

        {/* useEffect */}
        <h3>
          <strong>Timestamp of how long you've been here</strong>
        </h3>
        <p>{visitTime}</p>
      </div>
    </div>
  );
}
