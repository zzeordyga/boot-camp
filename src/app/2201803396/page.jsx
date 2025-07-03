"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import Layout from "./layout";
import Link from "next/link";
export default function Home(){
    const[catFacts, setCatFacts]=useState('');
    const counterRef=useRef(0);
    useEffect(()=>{
        fetch('https://catfact.ninja/fact')
        .then(res=>res.json())
        .then(data=>setCatFacts(data.fact));
    }, []);
    counterRef.current+=1;
    const catFactsLength=useMemo(()=>catFacts.length, [catFacts])
    return(
        <div className="space-x-3">
            <h2 className="text-4xl font-semibold text-pink-800">
                Cat Facts!
            </h2>
            <p className="p-2 border-red-600 text-yellow-300 rounded">
                {catFacts}
            </p>
            <p className="text-sm text-black">
                Number of times page is rendered is: {counterRef.current}
            </p>
            <p className="text-sm text-black">
                Length of Sentence is: {catFactsLength}
            </p>
        </div>
    );
}
