'use client'

import {useState,useEffect} from "react";
import Link from "next/link";

export default function detailPage(){
    const[advice,setAdvice] = useState("");

    useEffect(() = {
        fetch("https://api.adviceslip.com/advice")
        .then(rest => res.json())
        .then(data => setAdvice.(data.slip.advice))
    }, []);

    return(
        <div style={{maxWidth:500, margin:"40px auto", padding:24, background: "#fff", borderRadius: 12}}>
            <h2>More Advice</h2>
            <p style ={{fontStyle:"italic",minHeight:40}}>{advice}</p>
            <Link href="/2502000363">
            <button style={{ marginTop: 16, padding: "8px 16px", borderRadius: 4, background: "#2563eb", color: "#fff", border: "none" }}>
            ← Back
        </button>
      </Link>
    </div>    
    );
}