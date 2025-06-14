import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [likes, setLikes] = useState(0);
  const titleRef = useRef(null);

  useEffect(() => {
    console.log("Halaman Natalia dimuat.");
    if (titleRef.current) {
      titleRef.current.style.color = "#7B2CBF"; // ungu tua
    }
  }, []);

  const message = useMemo(() => {
    return likes > 0 ? `Kamu menyukai halaman ini ${likes} kali!` : "Belum ada like.";
  }, [likes]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 ref={titleRef}>Natalia Lairan - 2502023890</h1>
      <p>Saya adalah mahasiswa program studi Computer Science.</p>

      <p>{message}</p>
      <button onClick={() => setLikes(prev => prev + 1)}>
        Like
      </button>
    </div>
  );
};

export default MyPage;
