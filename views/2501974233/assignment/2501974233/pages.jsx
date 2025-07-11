"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export default function PostsPage(){
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() =>{
        const unsubscribe = onSnapshot(collection(db, "posts"), snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPosts(data);
        });
        return () => unsubscribe();
    }, []);
  
    const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
        <h1>Posts</h1>
        <input
            type="text"
            placeholder="Search by Title..."
            value={search}
            onChange={e => setSearch(e.target.value)} 
        />
        <ul>
            {posts.map(post =>(
            <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
            </li>
            ))}
        </ul>
        </div>
    );
}
