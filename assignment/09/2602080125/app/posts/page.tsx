"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase";
import type { Posts } from "@/types/posts";
import ErrorBoundary from "@/components/ErrorBoundary";
import ErrorFallback from "@/components/ErrorFallback";
import AddPostModal from "@/components/AddPostModal";
import PostCard from "@/components/PostCard";

function PostList() {
    const [postData, setPostData] = useState<Posts[]>([]);
    const [loaderData, setLoaderData] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [filterSearch, setFilterSearch] = useState("");

    useEffect(() => {
        const queryData = query(
            collection(firebaseDb, "posts"),
            orderBy("createdAt", "desc")
        );
        const subscribeData = onSnapshot(
            queryData, (snap) => {
                setPostData(snap.docs.map((data) => ({
                    id: data.id,
                    ...data.data()
                }) as Posts
                ));
                setErrorMessage(null);
                setLoaderData(false);
            },
            (err) => {
                console.error(err);
                setErrorMessage("Failed to load posts. Check your connection or Firestore rules.");
                setLoaderData(false);
            }
        );
        return () => subscribeData();
    }, []);

    const filteredData = useMemo(
        () => postData.filter((p) => p.title?.toLowerCase().includes(filterSearch.toLowerCase())),
        [postData, filterSearch]
    );

    if (loaderData) {
        return <p className="py-10 text-center text-sm text-zinc-500">Loading posts...</p>;
    }

    if (errorMessage) {
        return (
            <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
            >
                {errorMessage}
            </p>
        );
    }

    return (
        <>
            <input
                className="mb-6 w-full max-w-md rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-500"
                placeholder="Search by title..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
            />

            {filteredData.length === 0 ? (
                <p className="py-10 text-center text-sm text-zinc-500">
                    {filterSearch ? "No posts match your search." : "No posts yet. Be the first to write one."}
                </p>
            ) : (
                <div className="columns-1 gap-4 md:columns-2">
                    {filteredData.map((data) => (
                        <div key={data.id} className="mb-4 break-inside-avoid">
                            <PostCard post={data} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default function PostsPage() {
    return (
        <main className="mx-auto w-full max-w-7xl p-6 py-12">
            <div className="mb-8 mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        aria-label="Back to home"
                        className="text-3xl leading-none text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                        ←
                    </Link>
                    <div>
                        <h1 className="text-3xl font-semibold leading-none tracking-tight">
                            Live Feed
                        </h1>
                        <p className="mt-2 text-sm text-zinc-500">Updates in real time.</p>
                    </div>
                </div>

                <div className="shrink-0">
                    <AddPostModal />
                </div>
            </div>

            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <PostList />
            </ErrorBoundary>
        </main>
    );
}