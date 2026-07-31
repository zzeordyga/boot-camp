import React, { useState, useEffect, useRef, useMemo } from "react";

function factorialGenerator() {
    const cache = {
        0: 1,
        1: 1
    };
    return function factorial(n) {
        if (n < 0) return undefined;
        if (cache[n]) return cache[n];
        cache[n] = n * factorial(n - 1);
        return cache[n];
    };
}

const MyPage = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef();
    const factorial = useMemo(factorialGenerator(), [count]);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <div>
            <h1>Ljunghans Olive Wijaya - 2501967184</h1>
            <p>Computer Science</p>
            <input ref={inputRef} placeholder="Type here..." />
            <button onClick={() => setCount(count + 1)}>
                Clicked {count} times
            </button>
            <p>Factorial: {factorial}</p>
        </div>
    );
};

export default MyPage;
