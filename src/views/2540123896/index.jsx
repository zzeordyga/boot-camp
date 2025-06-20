import { useState, useEffect, useRef, useMemo } from 'react';

function BintangProfile() {
  const [clicks, setClicks] = useState(0);
  const headingRef = useRef(null);

  useEffect(() => {
    console.log(`You clicked ${clicks} times`);
  }, [clicks]);

  const doubled = useMemo(() => clicks * 2, [clicks]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', lineHeight: '1.5' }}>
      <h1 ref={headingRef}>Bintang Satria Khanafi - 2540123896</h1>
      <p>
        I'm a Computer Science student at BINUS University. Passionate about web development and problem solving.
      </p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setClicks(clicks + 1)} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Click Me!
        </button>
        <p>You've clicked {clicks} times. Doubled: {doubled}</p>
      </div>
    </div>
  );
}

export default BintangProfile;
