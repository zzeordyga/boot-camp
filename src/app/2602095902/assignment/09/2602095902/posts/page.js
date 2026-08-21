'use client'

import { useEffect, useMemo, useState } from "react";
import { db } from "../lib/firebase";
import { getDocs, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { ErrorBoundary } from "../component/ErrorBound";

function PostsListContent() {
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const postsCollectionRef = collection(db, "posts");
        const postsQuery = query(postsCollectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(
            postsQuery,
            (querySnapshot) => {
                const fetchedPosts = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title || "",
                        content: data.content || "",
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString() : "No Date",
                    };
                });
                setPosts(fetchedPosts);
                setLoading(false);
            },
            (err) => {
                console.error("Firestore onSnapshot error:", err);
                setError(err.message);
                setLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);

    const filteredPosts = useMemo(() => {
        return posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [posts, searchQuery]);

    if (loading) return <div className="p-4">Loading Posts</div>;
    if (error) return <div className="text-red-500">Error : {error}</div>;

    return (
        <div className="p-2 bg-slate-200 space-6">
            <input
                type="text"
                placeholder="Filter posts by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:max-w-xs text-sm"
            />

            <table className="m-4 table-auto">
                <thead>
                    <tr className='border border-gray-300 px-4 py-2'>
                        <th className='border border-gray-300 px-4 py-2'>Title</th>
                        <th className='border border-gray-300 px-4 py-2'>Content</th>
                        <th className='border border-gray-300 px-4 py-2'>Created Date</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        filteredPosts.length === 0 ? (
                            <tr>
                                <td className="border border-gray-300 px-4 py-4 text-center text-gray-500">
                                    No posts found.
                                </td>
                            </tr>
                        ) :
                            (
                                filteredPosts.map((post) =>
                                    <tr key={post.id} className='border border-gray-300 px-4 py-2'>
                                        <td className='border border-gray-300 px-4 py-2'>{post.title}</td>
                                        <td className='border border-gray-300 px-4 py-2'>{post.content}</td>
                                        <td className='border border-gray-300 px-4 py-2'>{post.createdAt}</td>
                                    </tr>
                                ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default function PostsPage() {
    return (
        <ErrorBoundary>
            <PostsListContent />
        </ErrorBoundary>
    );
}

