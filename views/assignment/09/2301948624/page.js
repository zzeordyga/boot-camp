'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import getDatabase from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // ✅ loading state
  const inputRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getDatabase();
        const querySnapshot = await getDocs(collection(db, 'Article'));
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(docs);
      } catch (err) {
        setError('❌ Failed to load articles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(query)
    );
  }, [searchQuery, posts]);

  return (
    <>
      <div className='space-y-5 mb-10'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl text-center text-[var(--primary-color)]'>WordNest</h1>
        <p className='w-10/12 md:w-1/2 sm:text-lg md:text-xl text-center text-[var(--accent-color)] mx-auto'>
          Online article platform that provides readers with insightful, well-researched content across a variety of topics including technology, education, lifestyle, and current events.
        </p>
      </div>

      <div className='w-11/12 mx-auto flex flex-col md:flex-row px-6 justify-between mb-8 gap-y-5'>
        <h3 className='text-2xl text-center md:text-start sm:text-3xl md:text-4xl text-[var(--accent-color)] font-bold'>New Articles</h3>
        {/* 🔎 Input Search */}
        <div className='w-full md:w-1/3 lg:w-1/4'>
          <input
            type='text'
            ref={inputRef}
            placeholder='Search article...'
            className='w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]'
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Artikel Grid */}
      <div className='w-11/12 mx-auto grid grid-cols-1 grid-rows-6 md:grid-cols-2 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-2 justify-items-center gap-y-12 md:gap-x-6 mb-10'>
        {loading ? (
          <p className='col-span-full text-center text-[var(--accent-color)] text-xl mt-10'>
            Loading articles...
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className='mt-20 text-center text-2xl text-[var(--accent-color)] col-span-full'>No articles found.</p>
        ) : (
          filteredPosts.map(post => (
            <div
              key={post.id}
              className='w-11/12 border border-none bg-white/80 shadow-xl rounded-2xl p-4 space-y-4 transition duration-400 hover:shadow-2xl'
            >
              <h4 className='text-2xl font-bold text-[var(--text-color)] line-clamp-1'>{post.title}</h4>
              <span className='text-black text-sm/relaxed line-clamp-1'>{post.content}</span>
              <div className='flex justify-between mt-2'>
                <Link
                  href={`/article/${post.id}`}
                  className='p-2 bg-[var(--text-color)] text-[var(--primary-color)] rounded-lg hover:bg-[var(--background-color)]'
                >
                  View Detail
                </Link>
                <span className='p-1 bg-[var(--background-color)] text-[var(--primary-color)] rounded-lg'>
                  {post.createdAt?.toDate().toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HomePage;
