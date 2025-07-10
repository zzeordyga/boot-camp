'use client'
import { collection, getDocs, Timestamp, onSnapshot } from "firebase/firestore";
import getDatabase from "../firebase/config";
import PageList from "./page-list.jsx";
import Spinner from "../component/loading.jsx";
import { useEffect, useState } from "react";

import Link from "next/link";


export default function postPage(){
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("");

    useEffect(()=>{
        console.log("run this");
        let unsubscribe;
        
        try{

            const fetchPost = async ()=>{
                const db = getDatabase();

                if (!db) {
                    console.error("Database instance is undefined. Check firebase/config.");
                    setLoading(false);
                    return;
                }

                const postCol = collection(db,"posts");
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
    
    return (
        <>
        <Link href="/2440111573">
            Back to Main Page
        </Link>
        <br />
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
        <PageList posts = {filteredPosts} />
        </>
    );
}