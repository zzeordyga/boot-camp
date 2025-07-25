'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
  const [clickCount, setClickCount] = useState(0);
  const inputRef = useRef();
  const doubledCount = useMemo(() => clickCount * 2, [clickCount]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h1>Imanuel Eklesio - 2440044190</h1>
      <p>In Game Application and technology, we learn to create games from scratch, from coding the game mechanics to object and UI modelling. We mostly learn to make these games in a software called Unity as the game engine. the main coding language that is used in Unity is C#</p>
      <input ref={inputRef} placeholder="Type something..."/>
      <button onClick={() => setClickCount(clickCount + 1)}>
        Clicked {clickCount} times
      </button>
      <p>Doubled Clicks: {doubledCount}</p>
    </div>
  );
};

export default MyPage;
