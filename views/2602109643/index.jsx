import React, { useState, useEffect, useMemo, useRef } from "react";

const myPage = () => {
  const [reverseBool, setNameReverse] = useState(false);
  const inputRef = useRef();
  const name = "Bryant";
  const studentId = "2602109643";
  const doubled = useMemo(() => count * 2, [count]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>{name}</h1>
      <h3>{studentId}</h3>
      <p>Deskripsi lorem </p>
      <input ref={inputRef} placeholder="Type Something..."></input>
      <button onClick={() => setCount(count + 1)}>clicked {count} times</button>
      <p>Doubled: {doubled}</p>
    </div>
  );
};

export default myPage;
