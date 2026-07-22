'use client'
import React, { useState, useEffect, useRef, useMemo } from 'react'

const headingStyle = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
}

const cardStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    // justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    backgroundColor: '#cdcdcd', 
    width: 500, 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    borderRadius: 10,
    padding: '0px 20px'
}

const textStyle = {
    fontFamily: 'sans-serif', 
    textAlign: 'center'
}

const buttonStyle = {
    margin: '10px 0', 
    backgroundColor: '#5099d9', 
    padding: 10, 
    border: '1px solid', 
    borderRadius: 5,
}

export default function MyPage() {

    const [count , setCount] = useState(0);
    const inputRef = useRef();
    const doubled = useMemo(() => count * 2, [count]);

    const handleEnterInput = (e) => {
        e.preventDefault();
        if(inputRef.current.value)
            alert('Hello ' + inputRef.current?.value + '. Nice to meet you.')
    }

    useEffect(() => {
        inputRef.current.focus();
    }, []);

  return (
    <div>
        <h1 style={headingStyle}>Kenneth Ferlianto - 2602113691</h1>
        <div style={cardStyle}>
            <p style={textStyle}>I am a Computer Science student who is interested in Frontend Developement, Game Development, and Data Science.</p>
            <h2 style={headingStyle}>Greetings</h2>
            <h3 style={{...headingStyle, marginBlock: 10}}>Enter your name</h3>
            <input style={{padding: 5}} ref={inputRef} type="text" placeholder='e.g. John Doe' />
            <button style={buttonStyle} onClick={handleEnterInput}>
                Enter
            </button>
            <h2 style={headingStyle}>Increment Counter</h2>
            <h3 style={{...headingStyle, marginBlock: 10}}>Click counter: {count}</h3>
            <div style={{display: 'flex', gap: 10}}>
                <button style={buttonStyle} onClick={() => setCount(count + 1)}>
                    Increment  
                </button>    
                <button style={buttonStyle} onClick={() => setCount(0)}>
                    Reset
                </button>
            </div>
            <p style={textStyle}>Doubled: {doubled}</p>
        </div>
    </div>
  )
}
