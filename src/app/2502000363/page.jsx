'use client'
import React, { useState,useEffect,useRef,useMemo} from 'react';

const MyPage = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef();
    const doubled = useMemo(() => count * 2, [count]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div style={{padding: '2rem',fontFamily: 'Arial'}}>
        <h1>Owen Maha Putra - 2502000363</h1>
        <p>I am currently studying Computer Science at BINUS University with streaming minor of Interactive Multimedia
            which focuses on front-end development. This program helps me build websites, improve user experiences and prepare for 
            real world application problems.   
        </p>
        <input ref={inputRef}
         placeholder="type here..." 
         style={{marginRight: '1rem'}}
         />
        <button onClick={() => setCount(count + 1)}>
            Click me for {count} times
        </button>
        <p>Doubled: {doubled}</p>
        </div>
    );
};

export default MyPage;
