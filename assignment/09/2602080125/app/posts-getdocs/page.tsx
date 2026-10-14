"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase";
import type { Posts } from "@/types/posts";
import PostCard from "@/components/PostCard";

export default function PostsGetDocsPage() {
    const [posts, setPosts] = useState<Posts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const q = query(collection(firebaseDb, "posts"), orderBy("createdAt", "desc"));
                const snap = await getDocs(q);
                setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Posts));
            } catch (e) {
                console.error(e);
                setError("Failed to load posts. Check your connection or Firestore rules.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <main className="mx-auto w-full max-w-7xl p-6 py-12">
            <div className="mb-8 mt-4 flex items-center gap-4">
                <Link
                    href="/"
                    aria-label="Back to home"
                    className="text-3xl text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                    ←
                </Link>

                <div>
                    <h1 className="text-3xl font-semibold leading-none tracking-tight">
                        Explore Posts
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Loaded once when the page opens. Refresh to see new posts.
                    </p>
                </div>
            </div>

            {loading ? (
                <p className="py-10 text-center text-sm text-zinc-500">Loading posts...</p>
            ) : error ? (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                >
                    {error}
                </p>
            ) : posts.length === 0 ? (
                <p className="py-10 text-center text-sm text-zinc-500">No posts yet.</p>
            ) : (
                <div className="columns-1 gap-4 md:columns-2">
                    {posts.map((p) => (
                        <div key={p.id} className="mb-4 break-inside-avoid">
                            <PostCard post={p} />
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}