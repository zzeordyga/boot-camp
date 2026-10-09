"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const fetchPostDetail = async (id, signal) => {
    const [postRes, commentsRes] = await Promise.all([
        fetch(`${BASE_URL}/posts/${id}`, { signal }),
        fetch(`${BASE_URL}/posts/${id}/comments`, { signal }),
    ]);
    if (!postRes.ok) throw new Error(`Post not found (${postRes.status})`);

    return {
        post: await postRes.json(),
        comments: commentsRes.ok ? await commentsRes.json() : [],
    };
};

const PostDetail = () => {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const [commentDatas, setCommentDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const getPostDetail = async (signal) => {
        try {
            setIsLoading(true);
            setErrorMessage("");
            const { post, comments } = await fetchPostDetail(id, signal);
            setPostData(post);
            setCommentDatas(comments);
        } catch (err) {
            if (err.name === "AbortError") return;
            setErrorMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        getPostDetail(controller.signal);
        return () => controller.abort();
    }, [id]);

    return (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
            {/* Back Navigation */}
            <Link
                href="/2602080125/json-placeholder"
                className="text-sm font-medium text-slate-500 hover:text-emerald-700"
            >
                ← Back to posts
            </Link>

            {/* Loading */}
            {isLoading && (
                <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-white py-20">
                    <div
                        role="status"
                        aria-label="Loading"
                        className="size-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"
                    />
                    <p className="text-sm font-medium text-slate-500">Loading post...</p>
                </div>
            )}

            {/* Error */}
            {errorMessage && (
                <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-2xl border border-red-200 bg-white px-6 py-16 text-center">
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
                        <h2 className="text-xl font-semibold text-slate-900">
                            Something went wrong
                        </h2>
                        <p className="mt-1 max-w-md leading-6 text-slate-500">
                            We couldn't load this post. Check your connection and try again.
                        </p>
                        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                    </div>
                    <button
                        onClick={() => getPostDetail()}
                        className="rounded-xl bg-emerald-600 px-6 py-2.5 font-medium text-white transition hover:bg-emerald-700"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Content */}
            {!isLoading && !errorMessage && postData && (
                <>
                    {/* Post */}
                    <article className="mb-8 mt-4 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                        <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-sm font-semibold text-emerald-700">
                            #{postData.id}
                        </span>
                        <h1 className="mt-4 text-2xl font-semibold capitalize tracking-tight text-slate-900 sm:text-4xl">
                            {postData.title}
                        </h1>
                        <div className="mt-4 h-1 w-16 rounded-full bg-emerald-600" />
                        <p className="mt-4 leading-7 text-slate-600">{postData.body}</p>
                        <p className="mt-6 text-sm text-slate-400">
                            Written by User {postData.userId}
                        </p>
                    </article>

                    {/* Comments */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                        <h2 className="text-xl font-semibold text-slate-900">
                            {commentDatas.length}{" "}
                            {commentDatas.length === 1 ? "Comment" : "Comments"}
                        </h2>

                        <div className="mt-6 space-y-6">
                            {commentDatas.map((comment) => (
                                <div key={comment.id} className="flex gap-4">
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold uppercase text-emerald-700">
                                        {comment.email[0]}
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-semibold text-slate-900">
                                            {comment.email}
                                        </p>
                                        <p className="mt-0.5 text-sm font-medium capitalize text-slate-500">
                                            {comment.name}
                                        </p>
                                        <p className="mt-1 leading-6 text-slate-700">
                                            {comment.body}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default PostDetail;