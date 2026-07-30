'use client'
import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function DetailsPage() {
    const generateCount = useRef(0);
    const [fact,setFact] = useState('');

    useEffect(()=>{
        async function fetchFact() {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            setFact(data.fact);
        }
        fetchFact();
    }, []);

    async function onclickFetch(){
        generateCount.current++;

        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        setFact(data.fact);
    }

    const totalWords = useMemo(()=>{
        return fact.split(" ").length;
    }, [fact]);



    return(
        <div style={{display:'flex', flexDirection:'column', justifyContent:"center", alignItems:'center', padding:'2rem'}}>
            <h2 style={{margin:'1rem', backgroundColor:'orange', padding:'16px', border:'solid 2px orange', borderRadius:'16px', textAlign:'center'}}>Random Fact For The Day: </h2>
            <h3 style={{margin:'0', textAlign:'center', maxWidth:'400px'}}>{fact}</h3>
            <p>Words total : {totalWords}</p>
            <button onClick={() =>onclickFetch()} style={{margin:'16px', backgroundColor:'lime', padding:'8px', borderRadius:'8px', cursor:'pointer' ,textAlign:'center'}}>Generate more</button>
            <p style={{textAlign:'center'}}>You have been generating for {generateCount.current} times</p>
        </div>
    )
}
