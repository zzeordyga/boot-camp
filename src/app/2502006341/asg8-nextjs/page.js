"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home(){

    const [choice, setChoice] = useState("");
    const [id, setId] = useState("");
    const [year, setYear] = useState("");
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const choiceSelect = useRef(null);
    const pickCard = useRef(null);

    useEffect(()=> {
        pickCard.current.style.display = "none";
    }, []);


    useEffect(()=>{
        fetchData();    
    }, [choice, pickCard]);


    const fetchData = async() => {
        const response = await fetch(`https://dune-api-a4iq.onrender.com/${choice}`);
        console.log(response);
        const contentType = response.headers.get("content-type");
        if(contentType.includes("application/json")){
            const data = await response.json();
            console.log(data);
            data.map((index)=>{
                setId(index.id);
                if(choice=="quotes"){
                    setTitle(index.quote);
                    setYear("");
                    setDetail("");
                }
                else if (choice=="movies"){
                    setTitle(index.title);
                    setYear(index.year);
                    setDetail(index.director);
                }
                else {
                    setTitle(index.title);
                    setYear(index.year);
                    let detailString = "";
                    if (Array.isArray(index.author)) {
                        detailString = index.author.join(", ");
                    } else {
                        detailString = index.author;
                    }
                    setDetail(detailString);
                }
            })
            pickCard.current.style.display = "flex";
        }
    }


    function randomPick(){
        const param = choiceSelect.current.value;
        setChoice(param);
    }

    return (
        <div className="hero">
            <h1>Books, Movies, and Quotes Space</h1>
            <h3>Let us pick a random book, movie, or quote</h3>
            <p className="subtitle">Content and API provided by <Link href="https://github.com/ywalia01/dune-api" className="font-bold">Dune API</Link></p>
            <div className="sort">
                <label>Choice:</label>
                <select ref={choiceSelect}>
                    <option value={"books"}>Book</option>
                    <option value={"movies"}>Movie</option>
                    <option value={"quotes"}>Quote</option>
                </select>
                <button onClick={randomPick}>Do it!</button>
            </div>

            <div className="our-pick card" ref={pickCard}>
                <h3>Our Pick</h3>
                <p>ID: {id}</p>
                <p className="main">{title}</p>
                {year==""? "" : <p className="subtitle">Year: {year}</p>}
                {detail==""? "" : <p className="subtitle">{detail}</p>}
            </div>
        </div>
    )
}