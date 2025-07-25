'use client'
import React, {useState, useEffect, useRef, useMemo} from "react";

const myPage = () => {
    const [count, setCount] = useState(0);
    const inputRef = useRef();
    const doubled = useMemo(() => count * 2, [count]);
    useEffect(() => {
        document.title = 'Clicked button ${count} times';
        inputRef.current = count;
    }, [count]);

    return(
        <div className="pb-8 text-center">
            <h1 className="text-4x1 font-bold">Abhiniwesa Pinandita - 2201803396</h1>
            <p className="mb-6">
                I have graduated with a degree in Computer Science & Statistics, 
                a dual degree program that allow me to both Computer Science & Statistics
            </p>
            <button className="bg-green-800 text-black px-8 py-4 " onClick={() => setCount(count + 1)}>
                Click Here ({count})
            </button>
            <p>Doubled score (useMemo): {doubled}</p>
            <p>Last Ref: {inputRef.current}</p>
        </div>
    );
}
export default myPage;
