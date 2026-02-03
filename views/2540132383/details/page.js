'use client'

import React, {useEffect, useRef, useMemo, useState} from "react";

export default function MainPage()
{
    const [data, setData] = useState([]);
    const [coolAmount, setCounter] = useState(0);

    useEffect(() => {
        fetch('https://catfact.ninja/fact')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.error('Failed to fetch Data:', err));
    }, []);

    const counter = useMemo(() => coolAmount * coolAmount * coolAmount, [coolAmount])

    const catPic = useRef(null)

    const addCoolCat = () => {
        if (catPic.current)
        {
            const coolCat = document.createElement('p');
            coolCat.textContent = "Cats are Cool"
            catPic.current.appendChild(coolCat);
            setCounter(coolAmount + 1)
        }
    };

    return(
        <>
            <div className='listContainer'>
                <div>
                    <h2 className='titleText'>RANDOM CAT FACTS</h2>
                    <div>{data && data.fact}</div>
                    <br></br>
                    <button className='buttonStyle'
                            onClick={addCoolCat}>Cool Cat</button>
                    <br></br>
                </div>
                <div ref={catPic}>
                    <div>COOL POW THREE : {counter}</div>
                </div>
            </div>
        </>
    )
}