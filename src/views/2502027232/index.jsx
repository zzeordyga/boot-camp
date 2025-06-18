import { useState, useEffect, useRef, useMemo } from "react";

export default function WalidPage() {
  const [count, setCount] = useState(0);
  const countRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
    countRef.current = count;
  }, [count]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Walid Fernando Sastriana</h1>
      <p className="mb-4">Computer Science - BINUS University</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setCount(count + 1)}
      >
        Klik Saya ({count})
      </button>
      <p>Nilai ganda (useMemo): {doubled}</p>
      <p>Ref terakhir: {countRef.current}</p>
    </div>
  );
}
