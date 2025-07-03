import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    document.title = `Klik: ${count}`;
  }, [count]);

  const doubled = useMemo(() => count * 2, [count]);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Halo, saya [NI KOMANG ADETIWI ANJANI] (NIM: [2502029383])</h1>
      <p>Saya adalah mahasiswa dari jurusan [Computer Science]</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setCount(count + 1)}>
          Tambah Count
        </button>
        <p>Count: {count}</p>
        <p>Doubled (useMemo): {doubled}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <input ref={inputRef} placeholder="Coba useRef di sini" />
      </div>
    </div>
  );
};

export default MyComponent;
