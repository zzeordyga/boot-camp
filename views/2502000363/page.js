'use client'
import { useState,useEffect,useMemo,useRef } from "react";
import Link from "next/link";

export default function MyPage(){

    const [advice, setAdvice] = useState("");
    const [input, setInput] = useState("");
    const [quote,setQuote] = useState("When the light shines out, You rise up to reach the end of the road. ");
    const inputRef = useRef();

    useEffect(() => {
        fetch("https://api.adviceslip.com/advice")
        .then((res) => res.json())
        .then((data) => setAdvice(data.slip.advice));
        inputRef.current && inputRef.current.focus();
    },[]);

    const filteredAdvice = useMemo(() => {
        if(!input) return advice;
        return advice.toLowerCase().includes(input.toLowerCase()) ? advice : "No advice is available.";

    }, [advice,input]);

    return (
        <div style ={{maxWidth: 500, margin: "40px auto", padding: 24, background: "#f9fafb",
            borderRadius: 12
        }}>
            <h2>Random Advice from Someone</h2>
            <input
            ref={inputRef}
            type={"text"}
            placeholder="Filter advice..."
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{padding: 8, width: "100%",
                marginBottom: 16, borderRadius:4
                ,border:"1px solid #ccc"
            }}
            />
            <p style={{fontStyle: "italic", minHeight: 40}}>{filteredAdvice}</p>
            <h3>My Quote</h3>
            <p style ={{color:"#555"}}>{quote}</p>
            <Link href="/2502000363/details">
            <button style={{marginTop:16,padding: "8px 16px", borderRadius:4, background: "#2563eb", color:"#fff", border:"none"}}>
            See Details
            </button>
            </Link>
            </div>
    );
}
