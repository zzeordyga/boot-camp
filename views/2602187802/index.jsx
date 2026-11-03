import { useState, useEffect, useMemo, useRef } from 'react';

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', textAlign: 'center', fontFamily: 'sans-serif', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '24px', color: '#1f2937' }}>
        Guntur Listyo Prabowo - 2602187802
      </h1>
      <p style={{ color: '#4b5563', lineHeight: 1.6 }}>
        I am a Computer Science student at Bina Nusantara University (BINUS),
        focusing on front-end development and UI/UX design.
      </p>

      <input
        ref={inputRef}
        placeholder="Type something..."
        style={{ padding: '8px', marginBottom: '12px', width: '100%', boxSizing: 'border-box' }}
      />

      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
      >
        Click {count} times
      </button>

      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;