'use client';

import { useRef } from 'react';

export default function Details() {
  const inputRef = useRef();

  const handleShow = () => {
    const text = inputRef.current.value;
    alert(`You typed: ${text}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Details Page</h2>
      <p className="mb-2">Try typing and clicking the button below:</p>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          className="border border-gray-300 px-3 py-2 rounded w-full"
          placeholder="Type something..."
        />
        <button
          onClick={handleShow}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Show
        </button>
      </div>
    </div>
  );
}
