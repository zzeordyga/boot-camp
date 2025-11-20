'use client'

import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { store } from "../../../../../lib/firebase";

export default function Assignment09Wilmer(){
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);

    // snapshot
    useEffect(() => {
        const unsub = onSnapshot(collection(store, 'posts'), (docs) => {
            const temp = [];
            docs.docs.map((doc) => {
                temp.push(doc.data())
            })
    
            setPosts(temp)
        },
        (error) => {
            console.error("Firestore snapshot error:", error);
            setFetchError(error);
        }
        )

        return () => unsub();
    }, [])

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
    );

    const getData = async () => {
        const temp = []
        const res = await getDocs(collection(store, 'posts')); 
        res.docs.map(doc => {
            temp.push(doc.data().text)
        })
        setPosts(temp)
    }

    if (fetchError) {
        return (
            <div style={{ padding: 12, color: 'red' }}>
                <h3>Error loading posts</h3>
                <p>{fetchError.message}</p>
            </div>
        );
    }

    return(
        <>
            {/* search data */}
            <h1>Posts</h1>
            <input 
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
            />
            <hr/>
            {/* display data */}
            {filteredPosts.length > 0 ? filteredPosts.map(p => (
                <div key={p.id}>
                    <h3>{p.title}</h3>
                    <p>{p.content}</p>
                    <p>{p.createdAt}</p>
                </div>
            )) : (<>Loading...</>)}
        </>
    )
}