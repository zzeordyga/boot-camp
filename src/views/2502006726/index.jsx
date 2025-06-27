import React, { useEffect, useRef, useState } from "react";

const Index = () => {
  const [student, setStudent] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [error, setError] = useState(null);

  const buttonRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch("/students.json");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        console.error("Error loading student data:", err);
        setError("Failed to load student data");
      }
    };

    fetchStudent();

    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  const putraProfile = student[27];

  const handleClick = () => {
    setClicked(!clicked);

    if (!clicked && languageRef.current) {
      setTimeout(
        () => languageRef.current.scrollIntoView({ behavior: "smooth" }),
        200
      );
    }
  };

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!putraProfile) return <div>Loading student data...</div>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>{putraProfile.name}</h1>
      <h2>{putraProfile.studyProgram}</h2>
      <p>{putraProfile.nim}</p>
      {!clicked ? (
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>My Study Program Description</h3>
          <p>
            I am currently pursuing a degree in Computer Science with a strong
            focus on software development, algorithms, and web technologies. My
            studies involve learning how to design and build efficient software
            systems, solve complex computational problems, and develop modern
            web applications using various programming languages and frameworks.
            I am also gaining a solid understanding of data structures, system
            architecture, and the principles behind building scalable and secure
            software solutions.
          </p>
        </div>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <h3>My Favorite Language</h3>
          <h4 ref={languageRef}>
            {putraProfile?.additionalData?.favoriteLanguage}
          </h4>
        </div>
      )}
      <button
        onClick={handleClick}
        ref={buttonRef}
        style={{ marginTop: "1rem" }}
      >
        {!clicked
          ? "Show My Favorite Language"
          : "Show My Study Program Description"}
      </button>
    </div>
  );
};

export default Index;
