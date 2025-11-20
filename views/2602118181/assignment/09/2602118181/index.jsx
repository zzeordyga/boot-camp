'use client';

import { useEffect, useState } from 'react';
import { db } from '../../../../../src/lib/firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  query,
  orderBy 
} from 'firebase/firestore';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const postsData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.() || new Date()
          }));
          setPosts(postsData);
          setFilteredPosts(postsData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Error fetching posts:', err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const addSamplePosts = async () => {
    setAdding(true);
    try {
      const samplePosts = [
        {
          title: 'Getting Started with Firebase',
          content: 'Firebase is a comprehensive app development platform by Google. It provides various services like authentication, real-time database, cloud storage, and more.',
          createdAt: serverTimestamp()
        },
        {
          title: 'Real-time Database with Firestore',
          content: 'Firestore is a flexible, scalable database for mobile, web, and server development. It keeps your data in sync across client apps through real-time listeners.',
          createdAt: serverTimestamp()
        },
        {
          title: 'Building Modern Web Apps with Next.js',
          content: 'Next.js is a React framework that enables functionality such as server-side rendering and generating static websites. It is perfect for building production-ready applications.',
          createdAt: serverTimestamp()
        }
      ];

      const postsRef = collection(db, 'posts');
      
      for (const post of samplePosts) {
        await addDoc(postsRef, post);
      }

      alert('Sample posts added successfully!');
    } catch (err) {
      console.error('Error adding sample posts:', err);
      alert('Failed to add sample posts: ' + err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-700 font-semibold">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Firebase Integration Project
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Next.js + Firebase + Firestore Real-time Database
            </p>
            
            <div className="max-w-2xl mx-auto mb-4">
              <input
                type="text"
                placeholder="🔍 Search posts by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm"
              />
            </div>

            {posts.length === 0 && (
              <button
                onClick={addSamplePosts}
                disabled={adding}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adding ? 'Adding...' : '➕ Add Sample Posts'}
              </button>
            )}
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-600">
              Showing <span className="font-bold text-blue-600">{filteredPosts.length}</span> of <span className="font-bold">{posts.length}</span> posts
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {posts.length === 0 ? 'No Posts Yet' : 'No Posts Found'}
              </h2>
              <p className="text-gray-600 mb-6">
                {posts.length === 0 
                  ? 'Click the button above to add some sample posts to get started.'
                  : 'Try adjusting your search query.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {post.createdAt.toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Implemented Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl">
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Firebase Setup</h3>
                  <p className="text-gray-600">Configured Firebase SDK with Firestore database</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl">
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Data Fetching</h3>
                  <p className="text-gray-600">Fetch posts from Firestore 'posts' collection</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl">
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Real-time Sync</h3>
                  <p className="text-gray-600">Live updates using onSnapshot listener</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl">
                    ✓
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Search Functionality</h3>
                  <p className="text-gray-600">Filter posts by title with real-time search</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl">
                    ✓
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Loading States</h3>
                  <p className="text-gray-600">Beautiful loading spinner while fetching data</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-500 text-white text-xl">
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Error Handling</h3>
                  <p className="text-gray-600">User-friendly error messages with retry option</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Use
            </h2>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-2">1.</span>
                <span>If no posts exist, click "Add Sample Posts" button to seed the database</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-2">2.</span>
                <span>Use the search bar to filter posts by title in real-time</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-2">3.</span>
                <span>Open Firebase Console to add/edit/delete posts and see real-time updates</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold text-blue-600 mr-2">4.</span>
                <span>All changes sync automatically without page refresh (real-time listener)</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
