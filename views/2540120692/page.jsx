'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [userId, setUserId] = useState("")

    const inputRef = useRef(null)

    useEffect(() => {
        if (userId == "") {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((res) => res.json())
                .then((data) => setPosts(data));
        } else {
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                .then((res) => res.json())
                .then((data) => setPosts(data));
        }
    }, [userId]);

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        setUserId(formJson.userId)

        inputRef.current.focus();
    }

    return (
        <div>
            <form className="flex space-x-4 items-center my-4" method="get" onSubmit={handleSubmit}>
                <label>
                    UserId : <input ref={inputRef} className="bg-white border p-1" name="userId" />
                </label>
                <button className="bg-red-700 h-8.5 rounded-md px-4 text-white" type="submit">Submit form</button>
            </form>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-sm text-gray-600">{post.body.slice(0, 100)}...</p>
                        <Link href={`post/${post.id}`} className="text-blue-500 text-sm underline mt-2 inline-block">
                            Read more
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}