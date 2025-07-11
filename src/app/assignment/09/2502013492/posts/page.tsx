'use client';
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, Timestamp } from "firebase/firestore";
import getDatabase from "../firebase/config";
import ErrorBoundary from "../component/ErrorBoundary";

type Post = {
    id: string;
    title: string;
    content: string;
    createdAt: Timestamp;
};

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const db = getDatabase();

    useEffect(() => {
        try {
            const q = query(collection(db, "posts"));
            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as Post[];
                    setPosts(data);
                    setLoading(false);
                },
                (err) => {
                    setError("Failed to load data.");
                    console.error("Firestore error:", err);
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        } catch (e) {
        setError("Unexpected error occurred.");
        console.error("Unexpected error:", e);
        setLoading(false);
        }
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="p-6">Loading posts...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;

    return (
        <ErrorBoundary>
            <main className="p-6 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Posts</h1>
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 mb-4 w-full rounded"
                />
                {filteredPosts.map((post) => (
                    <div key={post.id} className="mb-6 border-b pb-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="text-gray-700">{post.content}</p>
                        <small className="text-gray-500">
                            {post.createdAt?.toDate().toLocaleString()}
                        </small>
                    </div>
                ))}
            </main>
        </ErrorBoundary>
    );
}