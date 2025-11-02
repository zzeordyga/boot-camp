'use client'

import { useState, useEffect, useRef, useMemo } from 'react'

function Index() {

    const nama = "Yohanes Andrew Wijaya"
    const nim = "2540126033"

const [count, setCount] = useState(0);

  // 1. Use the useEffect hook
  useEffect(() => {
    // 2. This code runs AFTER the component renders (initially and on every update).
    //    It is a "side effect" because it interacts with the world outside of React (the browser API).
    document.title = `You clicked ${count} times`;
  }, [count]); // 3. Dependency Array: This effect only re-runs if 'count' changes.


  const inputRef = useRef(null);

  const handleClick = () => {
    // 2. Access the current DOM element through the .current property
    // and call a method on it (like .focus()).
    inputRef.current.focus();
  };

  const findFactorial = (n) => {
  console.log('Calculating factorial...'); // See when this runs!
  let result = 1;
  for (let i = 1; i <= n; i++) {
    // Simulate a long calculation
    for (let j = 0; j < 10000000; j++) {} 
    result *= i;
  }
  return result;
};

const [number, setNumber] = useState(5);
  const [toggle, setToggle] = useState(false);

  // 1. Memoize the expensive result
  const factorialResult = useMemo(() => {
    return findFactorial(number);
  }, [number]); // 2. Dependency Array: Only re-run if 'number' changes.

  return (
    <>
    <div className='base bg-blue-300 dark:bg-gray-800 pb-10 vw-100 transition-colors duration-500'>
      <div className=" profile flex flex-row items-center bg-blue-600">
        <div className='personInfo m-36'>
          <h1 id="name" className='text-white font-weight-800'>{nama}</h1>
          <h2 id="email" className='italic text-white'>{nim}</h2>
        </div>
      </div>

        <div className='content ml-45 mr-10 mt-5'>
          <div>
            <p id="bio" className='bg-blue-400 py-3 px-5 rounded-xl text-white'>
            I am studying Computer Science, a field of study regarding computers where we learn to develop technology through the means of computer. It can relate to tons of stuff such as software, automation, data, AI, etc.</p>
          </div>
        </div>
      </div>
<hr />
<div>
      <p>You clicked {count} time(s)</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>

    <hr />

    <div style={{ marginTop: '20px' }}>
      {/* 3. Attach the ref to the specific DOM element */}
      <input type="text" ref={inputRef} placeholder="I will be focused" />
      <button onClick={handleClick}>
        Focus the Input
      </button>
    </div>

    <hr />
    
    <div>
      <h2>Factorial of {number} is: {factorialResult}</h2>
      <button onClick={() => setNumber(number + 1)}>
        Increase Number
      </button>

      <hr />
      <p>
        Toggle State: {toggle ? 'ON' : 'OFF'}
      </p>
      <button onClick={() => setToggle(!toggle)}>
        Toggle Component
      </button>
    </div>

    </>
  )
}

export default Index
