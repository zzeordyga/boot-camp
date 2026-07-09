'use client'
import React, { useEffect, useMemo, useRef, useState } from "react";

function Index() {
  const [color, setColor] = useState("#3498db");
  const inputRef = useRef(null);

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  const rgbColor = useMemo(() => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }, [color]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Andi Mataraja - 2540124324</h1>
      <p style={{ marginTop: "-1rem", marginBottom: "2rem" }}>Computer Science</p>
      <h2 style={{ marginBottom: "-0.5rem" }}>Color Picker</h2>
      <input
        ref={inputRef}
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: "100px", height: "100px", margin: "1rem" }}
      />
      <p>Selected Color: {color}</p>
      <p>Text color: {rgbColor}</p>
    </div>
  );
}

export default Index;
