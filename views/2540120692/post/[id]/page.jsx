'use client';
import { useEffect, useState, useMemo, use } from 'react';

export default function PostDetails({ params }) {
    const { id } = use(params)

    const [post, setPost] = useState({
        "userId": 0,
        "id": 0,
        "title": "",
        "body": ""
    });

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [id]);

    const memoizedBodyLength = useMemo(() => post?.body.length ?? 0, [post]);

    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl text-center font-bold mb-10 ">{post.title}</h2>
            <p className="text-xl mb-6">{post.body}</p>
            <p className="text-xl font-bold mb-4">Length : {memoizedBodyLength}</p>
        </div>
    );
}