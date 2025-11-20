'use client';

import { useEffect, useState, useMemo } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebaseConfig';

export default function PostPage() {
    const [posts, setPosts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState('');

    const fetchPosts = async() => {
        try {
            const colRef = collection(db, 'posts');
            const snapshot = await getDocs(colRef);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(data);
            setFiltered(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch posts');
            setLoading(false);
        }
    };

    //Real-time sync
    const listenRealtime = () => {
        const colRef = collection(db, 'posts');
        return onSnapshot(colRef, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(data);
        });
    };

    //Filter with memo
    useEffect(() => {
        const result = posts.filter((p) =>
            p.title.toLowerCase().includes(keyword.toLowerCase())
        );
        setFiltered(result);
    }, [keyword, posts]);

    useEffect(() => {
        fetchPosts();
        const unsub = listenRealtime();
        return () => unsub();
    }, []);

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p style={{ color: 'red'}}>{error}</p>

    return (
        <div style={{ padding: '20px' }}>
            <h1>Posts</h1>

            <input
                type="text"
                placeholder="Search title..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{ padding: '8px', marginBottom: '16px', width: '100%'}}
            />

            {filtered.length === 0 ? (
                <p>No posts found.</p>
            ) : (
                filtered.map((post) => (
                    <div
                        key={post.id}
                        style={{ border: '1px solid #ddd', padding: '12px', marginBottom: '12px', borderRadius: '8px'}}
                    >
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>{new Date(post.createdAt).toLocaleString()}</small>
                    </div>
                ))
            )};
        </div>
    );
}