'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';

const MyPage = () => {
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRef = useRef();
    const doubled = useMemo(() => count * 2, [count]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    // Fetch data from the public API once, when the page loads
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!res.ok) throw new Error('Failed to fetch posts');
                const data = await res.json();
                setPosts(data.slice(0, 10)); // only show the first 10
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Nuroyan Muhammmad Senoadji - 2501977506</h1>
            <p>Computer Science</p>
            <input ref={inputRef} placeholder="Description" />
            <button onClick={() => setCount(count + 1)}>
                Click {count} times
            </button>
            <p>Doubled: {doubled}</p>

            <h2>Posts</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default MyPage;