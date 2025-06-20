import React, { useState, useEffect, useRef, useMemo } from "react";

function MyPage() {
  const [clicks, setClicks] = useState(0);
  const introRef = useRef(null);

  useEffect(() => {
    if (introRef.current) {
      introRef.current.style.color = "#1d4ed8"; // biru
    }
  }, []);

  const clickMessage = useMemo(() => {
    return clicks > 0 ? `You've clicked ${clicks} times!` : "Try clicking the button!";
  }, [clicks]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Fauzan Hafizh Zulfikar - 2201792032</h1>
      <p ref={introRef}>
       Saya adalah mahasiswa jurusan Computer Science yang mempelajari dasar-dasar komputasi, pemrograman, dan pengembangan sistem perangkat lunak.
      </p>
      <button
        onClick={() => setClicks(clicks + 1)}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#1d4ed8", color: "#fff", border: "none", borderRadius: "8px" }}
      >
        Click me
      </button>
      <p>{clickMessage}</p>
    </div>
  );
}

export default MyPage;
