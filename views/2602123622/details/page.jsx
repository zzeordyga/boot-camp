"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

export default function DetailsPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highlight, setHighlight] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch post:", err);
        setLoading(false);
      });
  }, []);

  const charCount = useMemo(() => {
    return post ? post.body.length : 0;
  }, [post]);

  const wordCount = useMemo(() => {
    return post ? post.body.split(" ").length : 0;
  }, [post]);

  const handleHighlight = () => {
    setHighlight((prev) => !prev);
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-500 animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">Post not found.</p>
        <Link href="/2602123622">
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-700">📄 Post Details</h2>

      <div
        ref={contentRef}
        className={`p-6 bg-white rounded-lg shadow border transition-all duration-300 ${
          highlight ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
        }`}
      >
        <span className="inline-block text-xs font-medium text-indigo-500 bg-indigo-50 px-2 py-1 rounded mb-3">
          Post #{post.id}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 mb-3 capitalize">
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
      </div>

      <div className="flex gap-4 flex-wrap text-sm text-gray-500">
        <div className="px-4 py-2 bg-gray-100 rounded">
          <strong>Characters:</strong> {charCount}
        </div>
        <div className="px-4 py-2 bg-gray-100 rounded">
          <strong>Words:</strong> {wordCount}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleHighlight}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
        >
          {highlight ? "Remove Highlight" : "Highlight"}
        </button>
        <Link href="/2602123622">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}