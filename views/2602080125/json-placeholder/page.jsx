"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const SHOW_SIZE = 25;
const fetchPosts = async (signal) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", { signal });
    if (!res.ok) throw new Error(`Request failed (${res.status})`);
    return res.json();
};

const PostsPage = () => {
    const [postDatas, setPostDatas] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("Some eerror detected")
    const [searchState, setSearchState] = useState("")
    const [dataVisible, setDataVisible] = useState(SHOW_SIZE)
    const searchRef = useRef(null);

    const getPostsData = async (signal) => {
        try {
            setIsLoading(true);
            setErrorMessage("");
            setPostDatas(await fetchPosts(signal));
        } catch (err) {
            if (err.name === "AbortError") return;
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getPostsData(controller.signal);
        return () => controller.abort();
    }, []);

    const filteredPostDatas = useMemo(() => {
        const keyword = searchState.trim().toLowerCase();
        if (!keyword) return postDatas;
        return postDatas.filter(
            (post) => post.title.toLowerCase().includes(keyword) || post.body.toLowerCase().includes(keyword)
        );
    }, [postDatas, searchState])

    const handleSearch = (e) => {
        setSearchState(e.target.value);
        setDataVisible(SHOW_SIZE);
    };

    const handleClear = () => {
        setSearchState("");
        setDataVisible(SHOW_SIZE);
        searchRef.current?.focus();
    };

    return (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
            {/* Back Navigation */}
            <Link
                href="/2602080125"
                className="text-sm font-medium text-slate-500 hover:text-emerald-700"
            >
                ← Back to home
            </Link>

            {/* Title Section */}
            <div className="mb-8 mt-4 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    Posts
                </h1>
                <div className="mt-4 h-1 w-16 rounded-full bg-emerald-600" />
                <p className="mt-4 max-w-xl leading-7 text-slate-500">
                    Search articles and read their complete details.
                </p>

                <div className="relative mt-6">
                    <input
                        ref={searchRef}
                        type="text"
                        value={searchState}
                        onChange={handleSearch}
                        placeholder="Search by title or content..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-24 text-slate-900 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    />
                    {searchState && (
                        <button
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-sm font-medium text-slate-500 hover:bg-slate-100"
                        >
                            X
                        </button>
                    )}
                </div>
            </div>

            {/* Loading Component */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white py-56">
                    <div
                        role="status"
                        aria-label="Loading"
                        className="size-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"
                    />
                    <p className="text-sm font-medium text-slate-500">Loading posts...</p>
                </div>
            )}

            {/* Error Component*/}
            {errorMessage && (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-white px-6 py-32 text-center">
                    <span className="flex size-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="size-7"
                            aria-hidden
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </span>

                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Something went wrong</h2>
                        <p className="mt-1 max-w-md leading-6 text-slate-500">We couldn't load the posts. Check your connection and try again.</p>
                        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                    </div>

                    <button
                        onClick={() => getPostsData()}
                        className="rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white transition hover:bg-emerald-700"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Content Section */}
            {!isLoading && !errorMessage && (
                <>
                    <p className="mb-4 text-sm text-slate-500">
                        Showing {Math.min(dataVisible, filteredPostDatas.length)} of {filteredPostDatas.length} posts
                    </p>

                    {filteredPostDatas.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-56 text-center text-slate-500">
                            No posts match “{searchState}”.
                        </div>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2">
                            {filteredPostDatas.slice(0, dataVisible).map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/2602080125/json-placeholder/${post.id}`}
                                    className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg sm:p-7"
                                >
                                    <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700">#{post.id}</span>
                                    <h2 className="mt-4 line-clamp-2 text-xl font-semibold capitalize text-slate-900 transition-colors group-hover:text-emerald-700">{post.title}</h2>
                                    <p className="mt-1 line-clamp-3 flex-1 leading-6 text-slate-500">{post.body}</p>
                                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="text-sm font-medium text-slate-600">
                                            Read details
                                        </span>
                                        <span className="text-lg text-emerald-700 transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {dataVisible < filteredPostDatas.length && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setDataVisible((v) => v + SHOW_SIZE)}
                                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
                            >
                                Load more
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    )
}
export default PostsPage