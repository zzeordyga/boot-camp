"use client"
import { useEffect } from "react"

export default function Error({error, reset}){

    useEffect(()=>{
        console.log(error);
    }, [error])

    return (
        <div className="hero">
            <h1 className="error-text">Oops! Something went wrong</h1>
            <p className="error-text">{error.message}</p>
            <button onClick={reset}>Try again</button>
        </div>
    )
}