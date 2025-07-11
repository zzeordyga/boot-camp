"use client"
import { useEffect, useRef, useState } from "react";
import { and, collection, endAt, getDocs, onSnapshot, or, orderBy, query, startAt, where } from "firebase/firestore";
import LoadState from "../components/loading";
import getDB from "../database/config";

export default function Posts(){

    const [posts, setPosts] = useState([]);
    const [loading, setLoad] = useState(true);
    const [keyword, setKeyword] = useState("");
    const searchField = useRef();
    const db = getDB();
    const fetchPosts = async ()=> {
        const postCol = collection(db, "posts");
        const postSnapshot = await getDocs(postCol);
        const postList = postSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setPosts(postList);
        console.log("Fetch all posts" + postList);
    }

    useEffect( ()=>{
        console.log(keyword);
        const postCol = collection(db, "posts");
        const postSnapshot = onSnapshot(postCol,
            (snapshot)=> {
                const postList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })).filter(
                    doc => (
                        (doc.title.startsWith(keyword) || doc.title.includes(` ${keyword}`))
                    )
                );
                console.log("Post after search" + postList);
                setPosts(postList);
            },
            (error) => {
                console.log(error);
            }
        );
        if(keyword==""){
            fetchPosts();
        }
        else {
            postSnapshot;
        }
        setLoad(false);
    }, [keyword]);

    function searchPosts(){
        setKeyword(searchField.current.value);
    }

    return <div className="hero">
        <h1>Posts</h1>
        <input type="text" placeholder="Search title with keyword ..." ref={searchField} onChange={searchPosts} style={{width: "100%"}}/>
        {loading? 
        <LoadState /> : 
        <div className="card-list">
            { posts.length===0? 
            <div className="wholePage">
                <p>No posts found!</p>
                <p className="subtitle">Please check if there is a typo in search.</p>
            </div> :
            posts.map((post) =>(<div className="card" key={post.id}>
                <p className="main">{post.title}</p>
                <p className="content">{post.content}</p>
                <p className="subtitle">Created at: {post.createdAt.toDate().toLocaleString()}</p>
            </div>))}
        </div>}
        
    </div>
}