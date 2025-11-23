'use client';

import { useState, useEffect, useMemo } from 'react';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasInitialData, setHasInitialData] = useState(false);

  useEffect(() => {
    let unsubscribe;

    const setupRealtimeListener = async () => {
      try {
        setLoading(true);
        
        // Initial fetch to check if collection exists and has data
        const postsCollection = collection(db, "posts");
        const initialSnapshot = await getDocs(postsCollection);
        
        if (initialSnapshot.empty) {
          setError("No posts found in the database. Please add some sample posts.");
          setLoading(false);
          return;
        }

        setHasInitialData(true);

        // Set up real-time listener
        const q = query(postsCollection);
        unsubscribe = onSnapshot(q, (snapshot) => {
          const postsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          
          setPosts(postsData);
          setLoading(false);
        }, (error) => {
          console.error("Error in real-time listener:", error);
          setError("Failed to connect to real-time database. Please refresh the page.");
          setLoading(false);
        });

      } catch (err) {
        console.error("Error setting up Firestore listener:", err);
        setError("Failed to connect to Firebase. Please check your configuration.");
        setLoading(false);
      }
    };

    setupRealtimeListener();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Filter posts based on search term
  const filteredPosts = useMemo(() => {
    if (!searchTerm.trim()) return posts;
    
    const term = searchTerm.toLowerCase();
    return posts.filter(post => 
      post.title?.toLowerCase().includes(term) ||
      post.content?.toLowerCase().includes(term)
    );
  }, [searchTerm, posts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return <Loading message="Connecting to Firebase..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!hasInitialData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No data available. Please add posts to your Firestore collection.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Real-time Posts</h2>
        <p className="text-gray-600">
          {filteredPosts.length} posts found • Updates in real-time
        </p>
      </div>

      <SearchBar onSearch={handleSearch} />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9.172 16.172a4 4 0 005.656 0M9.172 16.172a4 4 0 01-5.656 0m5.656 0a4 4 0 10-5.656-5.656m0 0a4 4 0 11-5.656-5.656m5.656 0a4 4 0 105.656-5.656" />
          </svg>
          <p className="mt-4 text-gray-600">No posts found matching your search</p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 fade-in"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    Post #{post.id.slice(0, 4)}
                  </span>
                  {post.createdAt && (
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                  {post.title || 'Untitled Post'}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.content || 'No content available'}
                </p>
                <div className="flex items-center text-sm text-indigo-600 font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Updated in real-time
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center text-sm text-gray-500 mt-4">
        <p>
          This data is synchronized in real-time with Firebase Firestore. Try adding, updating, or deleting posts in your Firebase console to see instant updates!
        </p>
      </div>
    </div>
  );
}