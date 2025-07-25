"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import getDatabase from "../firebase/config.js";
import { useRouter } from "next/navigation";
import ErrorBoundary from "../components/ErrorBoundary.jsx";

function PostPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const db = getDatabase();
  const router = useRouter();

  // Real-time fetch with loading and error handling
  useEffect(() => {
    setLoading(true);
    setError("");
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const postList = snapshot.docs.map((doc) => {
            const data = doc.data();
            let createdAt = "-";
            if (data.createdAt && typeof data.createdAt.toDate === "function") {
              createdAt = data.createdAt.toDate().toLocaleString();
            }
            return {
              id: doc.id,
              ...data,
              createdAt,
            };
          });
          setPosts(postList);
          setLoading(false);
        },
        (err) => {
          setError("Failed to fetch posts: " + err.message);
          setLoading(false);
        }
      );
      return () => unsub();
    } catch (err) {
      setError("Failed to fetch posts: " + err.message);
      setLoading(false);
    }
  }, [db]);

  // Search filter
  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter(
          (p) =>
            p.title?.toLowerCase().includes(search.toLowerCase()) ||
            p.content?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, posts]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      alert("Title and Content are required!");
      return;
    }
    try {
      await addDoc(collection(db, "posts"), {
        title: form.title,
        content: form.content,
        createdAt: serverTimestamp(),
      });
      setForm({ title: "", content: "" });
    } catch (err) {
      alert("Failed to add post: " + err.message);
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mt-10">
        {/* Back Button */}
        <button
          onClick={() => router.push("/assignment/09/2540124324")}
          className="absolute left-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded transition mb-4"
          type="button"
        >
          ← Back
        </button>
        {/* Table Section */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold mb-4 text-center">
            Inventory List
          </h3>
          <input
            type="text"
            placeholder="Search posts..."
            className="mb-4 w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading && (
            <div className="text-center text-gray-500 py-8">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-500 py-4">{error}</div>
          )}
          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-semibold border-b">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left font-semibold border-b">
                      Content
                    </th>
                    <th className="py-3 px-4 text-left font-semibold border-b">
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{e.title}</td>
                      <td className="py-2 px-4 border-b">{e.content}</td>
                      <td className="py-2 px-4 border-b">{e.createdAt}</td>
                    </tr>
                  ))}
                  {filteredPosts.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="py-4 text-center text-gray-400"
                      >
                        No posts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Form Section */}
        <div className="w-full md:w-80 bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="text-xl font-bold mb-4 text-center">Add New Post</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="title"
              type="text"
              placeholder="Title"
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
              value={form.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="content"
              placeholder="Content"
              className="px-3 py-2 border rounded focus:outline-none focus:ring"
              value={form.content}
              onChange={handleChange}
              required
              rows={4}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default PostPage;
