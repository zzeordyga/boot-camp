'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from "next/link";

const MyPage = () => {
  const [clickCount, setClickCount] = useState(0);
  const inputRef = useRef();
  const doubledCount = useMemo(() => clickCount * 2, [clickCount]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Imanuel Eklesio - 2440044190</h1>
      <p className="mt-2 mb-4">
        In Game Application and Technology, we learn to create games from scratch—
        from coding the game mechanics to object and UI modelling. We mostly use Unity,
        and the main language is C#.
      </p>
      <input ref={inputRef} placeholder="Type something..." className="border p-2" />
      <button
        onClick={() => setClickCount(clickCount + 1)}
      >
        Clicked {clickCount} times
      </button>
      <p className="mt-2">Doubled Clicks: {doubledCount}</p>

      <div className="mt-6 space-y-2">
        <Link href="/2440044190/Assignment_10_2440044190/auth">
          <button>
            Register/Login
          </button>
        </Link>

        <br />

        <Link href="/">
          <button>
            ← Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;