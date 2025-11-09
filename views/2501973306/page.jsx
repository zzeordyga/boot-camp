"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link";

export default function MainPage () {
    const [posts, setPosts] = useState([]);
    const [count, setCount] = useState(0);
    const inputRef = useRef();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
            .then((res) => res.json())
            .then((data) => setPosts(data))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    const totalWords = useMemo(() => {
        return posts.reduce((sum, post) => sum + post.body.split(" ").length, 0);
    }, [posts]);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Latest Posts</h2>

            <p className="text-gray-600 mb-4">
                Showing {posts.length} posts | Total words: {totalWords}
            </p>

            <ul className="space-y-3">
                {posts.map((post) => (
                    <li key={post.id}
                    className="p-4 border rounded-lg hover:bg-blue-50 transition">
                        <h3 className="font-bold text-blue-700">{post.title}</h3>
                        <p className="text-gray-700">{post.body}</p>
                    </li>
                ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
                <input ref={inputRef}
                type="text"
                placeholder="Type something..."
                className="border px-3 py-2 rounded-md"/>
                <button onClick={() => {
                    alert(`You typed: ${inputRef.current.value}`);
                    inputRef.current.value = "";
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Show Input
                </button>
            </div>

            <div className="mt-4 flex justify-between items-center">
                <p>Click count: {count}</p>
                <button onClick={() => setCount(count + 1)}
                    className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700"
                >
                    Increment
                </button>
            </div>

            <div className="mt-6 text-right">
                <Link href="/2501973306/details"
                    className="text-blue-600 hover:underline"
                >
                    → Go to Details Page
                </Link>
            </div>
        </div>
    );
}