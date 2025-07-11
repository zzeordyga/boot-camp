'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { collection, addDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config';


const MyPage = () => {
  const [count, setCount] = useState(0);
  const inputRef = useRef();
  const doubled = useMemo(() => count * 2, [count]);
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    inputRef.current.focus();

    const unsubscribe = onSnapshot(
      collection(db, 'posts'),
      (snapshot) => {
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
        setIsLoading(false);
      },
      (error) => {
        console.error('❌ Firestore error:', error);
        setError(error.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addPost = async () => {
    try {
      await addDoc(collection(db, 'posts'), {
        title: 'Test post',
        content: 'This post was added by program',
        createdAt: serverTimestamp(),
      });
      console.log('✅ Post added!');
    } catch (error) {
      console.error('❌ Error adding new post:', error);
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().trim().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Owen Maha Putra - 2502000363</h1>
      <p>
        I am currently studying Computer Science at BINUS University with streaming minor of Interactive Multimedia
        which focuses on front-end development. This program helps me build websites, improve user experiences and
        prepare for real world application problems.
      </p>

      <input
        ref={inputRef}
        placeholder="type here..."
        style={{ marginRight: '1rem' }}
      />
      <button onClick={() => setCount(count + 1)}>
        Click me for {count} times
      </button>
      <p>Doubled: {doubled}</p>

      <h2>Firestore Posts</h2>

      <label htmlFor="search">🔍 Search Post by Title:</label><br />
      <input
        id="search"
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />

      <button onClick={addPost} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        + Add Post
      </button>

      {error && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Error: {error}
        </p>
      )}

      {isLoading ? (
        <p>Loading posts....</p>
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} style={{ marginTop: '1rem', padding: '1rem', border: '1px solid' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>
              {post.createdAt?.seconds
                ? new Date(post.createdAt.seconds * 1000).toLocaleString()
                : 'No date'}
            </small>
          </div>
        ))
      ) : (
        <p>No post found</p>
      )}
    </div>
  );
};

export default MyPage;
