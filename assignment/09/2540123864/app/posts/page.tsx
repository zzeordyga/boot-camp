"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { store } from "../lib/firebase";
import { ErrorBoundary } from "../../components/ErrorBoundary";

export default function PostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInit() {
      try {
        const snap = await getDocs(collection(store, "posts"));
        let initData: any[] = [];
        snap.forEach((doc) => initData.push({ id: doc.id, ...doc.data() }));
        setPosts(initData);
      } catch (err) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    }

    fetchInit();

    const q = query(collection(store, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let updated: any[] = [];
      snapshot.forEach((doc) =>
        updated.push({ id: doc.id, ...doc.data() })
      );
      setPosts(updated);
    });

    return () => unsubscribe();
  }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>

        <input
          type="text"
          placeholder="Search posts by title..."
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && (
          <p className="text-gray-600 bg-gray-100 p-4 rounded-lg">Loading...</p>
        )}

        {error && (
          <p className="text-red-600 bg-red-100 p-4 rounded-lg">{error}</p>
        )}

        <div className="space-y-4">
          {!loading && filtered.length === 0 ? (
            <p className="text-gray-500 text-center mt-6">
              No posts found.
            </p>
          ) : (
            filtered.map((p) => (
              <div key={p.id} className="p-4 border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-gray-400 mt-1">{p.content}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {p.createdAt?.toDate
                    ? p.createdAt.toDate().toLocaleString()
                    : "No date"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
