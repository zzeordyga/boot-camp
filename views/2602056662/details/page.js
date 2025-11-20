'use client'
import { useEffect, useState } from "react";
import '../style.css';

export default function WilmerDetail(){
    const [data, setData] = useState();

    const fetchData = async () => {
        const dataResposne = await fetch('https://api.adviceslip.com/advice')
        const dataJson = await dataResposne.json()
        console.log(dataJson)
        setData(dataJson)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return(
        <>
            {data ? (<>
                <span>Advice {data.slip.id}: </span>
                <h1>"{data.slip.advice}"</h1>
            </>) : (<></>)}
        </>
    )
}