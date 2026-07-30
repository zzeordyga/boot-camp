"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { getPosts } from './firebase/firestoreGetPosts'
import { db } from './firebase/Initialize'
import { firestoreOnSnapshot } from './firebase/firestoreOnSnapshot'
import ErrorBoundary from './components/ErrorBoundary'
import FallbackUI from './components/FallbackUI'

export default function PostsPage() {
  const [getDocsPosts, setGetDocsPosts] = useState([]);
  const [onSnapshotPosts, setOnSnapshotPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredPosts = onSnapshotPosts.filter((post) =>{
    if(search === ""){
      return true;
    }

    return post.title.toLowerCase().includes(search.toLowerCase());
  })

  useEffect(() =>{
    async function loadPosts() {
      setLoading(true);
      try{
        const data = await getPosts();
        setGetDocsPosts(data);
      } catch(err){
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  useEffect(()=>{
    setLoading(true);
    const unsubscribe = firestoreOnSnapshot((data) =>{
      setOnSnapshotPosts(data);
      setLoading(false);
    },
    (error) =>{
      setError(error);
      setLoading(false);
    }
  );

    return () => unsubscribe();
  }, []);

  if(loading){
    return <h1>Loading...</h1>
  }

  if(error){
    // return <h1>Error: {error}</h1>
    return(
      <FallbackUI message={error} onRetry={()=> window.location.reload()}/>
    )
  }

  

  return (
    <ErrorBoundary>
      <div className='bg-amber-500 w-full h-full'>
        <h1>Posts Assignment 9</h1>

        <h2>GetDocs (Not realtime friendly, if data on firestore changed whether title or content, this will not change)</h2>
        {getDocsPosts.map((post) =>(
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}

        <h1>Search</h1>
        <input type="text" placeholder='ex: cheetah' value={search} onChange={(e)=> setSearch(e.target.value)}/>
        <h2>onSnapshot (Realtime friendly, if data on firestore changed whether title or content, this will change)</h2>
        {filteredPosts.map((post) =>(
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </ErrorBoundary>
  )
}
