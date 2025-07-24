'use client'
import { getDocs, Timestamp, onSnapshot, collection } from "firebase/firestore";
import getDatabase from "../firebase/config";
import PageList from "./page-list.jsx";
import Spinner from "../component/loading.jsx";
import { useEffect, useState } from "react";

import Link from "next/link";
import useLocalStorage from "../hook/useLocalStorage.js";

export default function postPage(){
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");
    const [sortOrder, setSortOrder] = useLocalStorage("sortOrder", "asc"); 

    useEffect(()=>{
        console.log("run this");
        let unsubscribe;
        
        try{

            const fetchPost = ()=>{
                const {db} = getDatabase();
                console.log("db: ", db);

                if (!db) {
                    console.error("Database instance is undefined. Check firebase/config.");
                    setLoading(false);
                    return;
                }

                const postCol = collection(db,"posts");
                // console.log("postCol: ", postCol);
                unsubscribe = onSnapshot(postCol,(snapshot)=>{
                    const postListData = snapshot.docs.map((doc)=>{
                        const data = doc.data();
                        const time = new Timestamp(data.createdAt.seconds, data.createdAt.nanoseconds).toDate();
                        return{
                            id: doc.id,
                            createdAt: time.toLocaleDateString("en-US"),
                            title: data.title,
                            content: data.content
                        }
                    })

                    //force catching error? vvv
                    if (postListData.length === 0) {
                        setPostList(() => { throw new Error("No data found - invalid collection"); });
                    } else {
                        setPostList(postListData);
                    }

                    console.log("success: ", postListData);

                    if(loading) setLoading(false);
                    setPostList(postListData);
                }, (error)=>{
                    console.log("fail: ", error);
                    setPostList(() => { throw new Error("Failed to load collection"); });
                    setLoading(false);
                })
                
                console.log(loading);
            
            }
            
            fetchPost();
            
        } catch (error){
            console.log("error found: ", error);
            setLoading(false);
        }

        return () => {
            if (unsubscribe){ 
                unsubscribe();
            }
        };
        
    },[])

    if(loading){
        console.log("loading right now: " + loading);
        return <Spinner/>
    }

    const filteredPosts = postList.filter((post) =>
        post.title.toLowerCase().includes(filter.toLowerCase())
    );

    filteredPosts.sort((a, b) => {  
        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });
             
    
    return (
        <>
        <Link href="/2440111573">
            Back to Main Page
        </Link>
        <br />
        <h1 className="text-center text-2xl font-bold mb-5">Add Assignment 11: sorting with preference hook and CRUD operation with onSnapshot</h1>
        <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search title..."
            style={{
                padding: "8px",
                marginBottom: "10px",
                width: "300px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
        />
        <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{
                padding: "8px",
                marginLeft: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
            }}
        >
            <option value="asc">Sort by Title (A-Z)</option>
            <option value="desc">Sort by Title (Z-A)</option>
        </select>
        <PageList posts = {filteredPosts} />
        </>
    );
}