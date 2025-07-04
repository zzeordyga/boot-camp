"use client"

import { useEffect, useRef, useState } from "react"

export default function BooksPage(){

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
        const response = await fetch("https://dune-api-a4iq.onrender.com/books/25");
        const data = await response.json();
        setData(data);
    }

    const fetchByID = async() => {
        console.log(`ID ${search}`);
        const response = await fetch(`https://dune-api-a4iq.onrender.com/books/id/${search}`);
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
        else if(searchId>22 || searchId<1){
            alert("ID should be from 1-22");
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
            {data.map((book)=><div className="card" key={book.id}>
                <p>ID: {book.id}</p>
                <p className="main">{book.title}</p>
                <p className="subtitle">{book.year}</p>
                <p className="subtitle">{Array.isArray(book.author)? book.author.join(", ") : book.author}</p>
            </div>)}
        </div>
    </div>
}