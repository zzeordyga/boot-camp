import React, { useState, useEffect, useRef, useMemo } from 'react';

const NAME = 'Muhammad Evran Khadafi';
const NIM = '2602180802';
const PROGRAM = 'Computer Science - Software Engineering';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    document.title = `${NAME} - ${NIM} (${count})`;
  }, [count]);

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 480, margin: '40px auto', padding: 16 }}>
      <h1>{NAME} - {NIM}</h1>
      <p>
        Saya adalah mahasiswa program studi {PROGRAM}. Saya mempelajari
        pemrograman, algoritma, dan pengembangan perangkat lunak. Cihuyy
      </p>

      <input ref={inputRef} placeholder="Type something..." />

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setCount(count + 1)}>
          Click {count} times
        </button>
      </div>

      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;
