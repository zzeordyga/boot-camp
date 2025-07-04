"use client"

import { useEffect, useRef, useState } from "react"

export default function QuotesPage(){

    const[search, setSearch] = useState(0);
    const[data, setData] = useState([]);
    const searchField = useRef(null);


    useEffect(()=>{
        if(search==0){
            fetchAll();
            return;
        }
        fetchByID();
    }, [search])

    const fetchAll = async() => {
        console.log("fetch semua");
        const response = await fetch("https://dune-api-a4iq.onrender.com/quotes/25");
        const data = await response.json();
        setData(data);
    }

    const fetchByID = async() => {
        console.log(`ID ${search}`);
        const response = await fetch(`https://dune-api-a4iq.onrender.com/quotes/id/${search}`);
        const data = await response.json();
        const array = []
        array.push(data);
        setData(array);
    }

    function searchByID(){
        const searchId = searchField.current.value;
        console.log(searchId);
        if(searchId==""){
            setSearch(0);
        }
        else if(searchId>342 || searchId<1){
            alert("ID should be from 1-342");
            setSearch(0);
            searchField.current.value = "";
        }
        else {
            setSearch(searchId);
        }
    }

    return <div className="wholePage">
        <div className="search">
            <label>ID</label>
            <input type="number" ref={searchField}/>
            <button onClick={searchByID}>Search</button>
        </div>
        <div className="card-list">
            {data.map((quote)=><div className="card" key={quote.id}>
                <p>ID: {quote.id}</p>
                <p className="main quote">{quote.quote}</p>
            </div>)}
        </div>
    </div>
}