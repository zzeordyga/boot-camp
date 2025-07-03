"use client";
import { useEffect, useState, useRef } from "react";
export default function Home(){
    const[catFacts, setCatFacts]=useState([]);
    const counterRef=useRef(0);
    const fetchCatFacts=async()=>{
        const res=await fetch("https://catfact.ninja/fact");
        const data=await res.json();
        setCatFacts(data.fact);
        counterRef.current+=1;
    }
    useEffect(()=>{
        fetchCatFacts();
    }, []);
    return(
        <div className="space-x-3">
            <h2 className="text-4xl font-semibold text-pink-800">
                Cat Facts!
            </h2>
            <blockquote className="p-2 bg-green-800 border-red-600 text-yellow-300 rounded">
                {fact}
            </blockquote>
            <button onClick={fetchCatFacts} className="bg-blue-400 hover:bg-blue-200 text-purple-500 px-4 py-1">
                New Cat Facts
            </button>
            <p className="text-sm text-black">
                Number of clicks is: <span>{counterRef.current}</span>
            </p>
            <p className="text-sm text-black">
                Length of Sentence is: <span>{catFacts.length}</span>
            </p>
        </div>
    );
}
