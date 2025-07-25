'use client'
import React, { useState, useEffect, useRef, useMemo } from "react";

const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    document.title = "Rafly Irham Safatulloh - 2501995345";
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Remove existing styling, then inject tailwind
  useEffect(() => {
    document.getElementsByTagName("style")[0]?.remove();

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";
    document.head.appendChild(script);

    // clean up
    return () => {
      const twScript = document.querySelector(
        'script[src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"]'
      );
      twScript?.remove();
    };
  }, []);

  return (
    <div className="flex flex-col px-20 py-32 bg-[#1A1A1D] h-dvh gap-4">
      <h1 className="text-4xl font-bold uppercase text-[#DFD0B8]">
        Rafly Irham Safatulloh - 2501995345
      </h1>
      <p className="text-2xl text-[#948979] font-semibold">Computer Science</p>
      <input
        className="px-3 py-2 border-[1px] border-[#ECDFCC] w-[300px] rounded-md text-[#ECDFCC] bg-[#ecdfcc2b] outline-none "
        ref={inputRef}
        placeholder="Type something..."
      />

      <div className="flex flex-row items-center gap-x-2">
        <button
          className="px-3 py-2 border-[1px] border-[#ECDFCC] w-[300px] rounded-md text-[#ECDFCC] bg-[#ecdfcc2b] hover:bg-[#ecdfcc2b]/90 active:scale-95 transition-all duration-300 outline-none cursor-pointer"
          onClick={() => setCount(count + 1)}
        >
          Click {count} times
        </button>
        <p className="text-[#ECDFCC]">Doubled: {doubled}</p>
      </div>
    </div>
  );
};

export default MyPage;
