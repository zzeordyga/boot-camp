/*
'use client'
import { useState, useEffect, useRef, useMemo } from "react";

const MyPage = () => {
    const NIM = "2602095902";
    const Name = "Justin Tjandra"

    const [count, setCount] = useState(0);
    const inputRef = useRef();
    const doubled = useMemo(() => count * 2, [count]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div>
            <h1>{NIM} - {Name}</h1>
            <p>Computer Science</p>
            <p>To live is to struggle while keeping your head tall</p>
            <input ref={inputRef} placeholder="Enter characters..."></input>
            <button onClick={() => setCount(count + 1)}>Clicked {count} times!</button>
            <p>Doubled Result: {doubled}</p>
        </div>

    );
}

export default MyPage;

 */

// src/app/2602095902/details/page.jsx
import HomePage from "../../../views/2602095902/app"; //Pokemon Sesi7
import PostsPage from "./assignment/09/2602095902/posts/page"; //Firebase Sesi8 

export default function Page() {
    return <PostsPage />;
}