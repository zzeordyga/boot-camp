"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import PostList from "./PostList";

function PostsManager() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;
    let unsubscribe = null;

    const postsCollection = collection(db, "posts");

    async function fetchPosts() {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(postsCollection);

        if (!isActive) return;

        const initialPosts = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        setPosts(initialPosts);
        setLoading(false);

        unsubscribe = onSnapshot(
          postsCollection,
          (snapshot) => {
            const updatedPosts = snapshot.docs.map((document) => ({
              id: document.id,
              ...document.data(),
            }));

            setPosts(updatedPosts);
            setError("");
            setLoading(false);
          },
          (firebaseError) => {
            console.error("Firestore listener error:", firebaseError);

            setError("Unable to receive live updates. Please try again.");
            setLoading(false);
          }
        );
      } catch (firebaseError) {
        console.error("Error fetching posts:", firebaseError);

        if (isActive) {
          setError("Failed to load posts. Please check your connection.");
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      isActive = false;

      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) =>
      post.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Content Management
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Posts Manager
          </h1>

          <p className="mt-3 text-gray-500">
            Browse and search posts stored in Firebase Firestore.
          </p>
        </div>

        <div className="mb-8">
          <label
            htmlFor="search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search posts
          </label>

          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by post title..."
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            All Posts
          </h2>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {filteredPosts.length} posts
          </span>
        </div>

        {loading && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-gray-500">
              Loading posts...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h3 className="font-semibold text-red-800">
              Unable to load posts
            </h3>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Reload Page
            </button>
          </div>
        )}

        {!loading && !error && (
          <PostList posts={filteredPosts} />
        )}
      </div>
    </main>
  );
}

export default PostsManager;