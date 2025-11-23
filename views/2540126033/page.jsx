'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import Link from 'next/link';

function Index() {

    const nama = "Yohanes Andrew Wijaya"
    const nim = "2540126033"

const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);


  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  const findFactorial = (n) => {
  console.log('Calculating factorial...');
  let result = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 10000000; j++) {} 
    result *= i;
  }
  return result;
};

  const [number, setNumber] = useState(5);
  const [toggle, setToggle] = useState(false);

  const factorialResult = useMemo(() => {
    return findFactorial(number);
  }, [number]);

  return (
    <>
    <div className='base bg-blue-300 dark:bg-gray-800 pb-10 vw-100 transition-colors duration-500'>

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

      <hr />
      <Link href={'./2540126033/jason'}>
      <button>
        Go to Page Fetch
      </button>
      </Link>
    </div>
    </>
  )
}

export default Index
