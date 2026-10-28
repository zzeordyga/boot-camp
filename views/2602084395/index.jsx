import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {

  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  const inputRef = useRef();

  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    console.log('Component mounted');
    inputRef.current.focus();

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px', maxWidth: '480px' }}>
      <h1>Malvin - 2602084395</h1>
      <p>
        Saya mahasiswa program studi Computer Science. Saya mempelajari
        pemrograman, algoritma, dan pengembangan aplikasi web, termasuk React.
      </p>

      <h2>Please enter your name:</h2>
      <input
        type="text"
        ref={inputRef}
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>{name ? `Hello, ${name}!` : 'Type your name above.'}</p>

      <button onClick={() => setCount(count + 1)}>Click {count} times</button>
      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default MyPage;
