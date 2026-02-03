'use client'
import React, { useEffect, useMemo, useRef, useState } from "react";

function ChangeColor(index)
{

    switch (index)
    {
        case 0:
            nameRef.current.style.color = "purple";
    }
}

const MyPage = () =>
{
    const [count, setCount] = useState(0);
    const doubled = useMemo(() => count * 2, [count]);
    const powerOfThree = useMemo(() => count * count * count, [count]);
    const root = useMemo(() => Math.sqrt(count), [count]);
    const [timer, setTimer] = useState(0);
    let interval = useRef(0);

    const [colorIndex, setIndex] = useState(0);
    const colorRef = useRef(null);

    useEffect(() => {
        interval = setInterval(() =>
            setTimer((timer) => timer + 1), 1000);

        return () => clearInterval(interval);
    })

    const background = {
        backgroundColor: '#556B2F',
        width: '100vw',
        height: '100vh',
    };

    const topContainer = {
        margin: '0 auto',
        paddingTop : '10px',
        textAlign: 'center',
        color: '#EFF5D2',
        fontFamily: 'Tahoma',
    };

    const bodyContainer = {
        width: '900px',
        margin: '0 auto',
        backgroundColor: '#8FA31E',
        color: '#EFF5D2',
        padding : '10px',
        paddingLeft : '20px',
        paddingBottom: '30px',
        borderRadius: '10px',
        fontFamily: 'Tahoma',
    };

    const buttonStyle = {
        textAlign: 'center',
        marginRight : '10px',
        padding: '7px 16px',
        minHeight: '36px',
        minWidth: '36px',
        color: '#EFF5D2',
        background: '#008060',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'Tahoma',
}

    return (
        <>
            <div style={background}>
                <div style={topContainer}>
                    <p>You're on my page for {timer} seconds</p>
                </div>
                <div style={bodyContainer}>
                    <h1>Sebastian Putra Cahyadi - 2540132383</h1>
                    <p>Computer Science</p>
                    <button style={buttonStyle} onClick={() => setCount(count + 1)}>
                        Click {count} times
                    </button>
                    <button style={buttonStyle} onClick={() => setCount(0)}>
                        Return count to 0
                    </button>
                    <p>Doubled : {doubled}</p>
                    <p>Power of three : {powerOfThree}</p>
                    <p>Root : {root}</p>
                    <h2 ref={colorRef}>Colored Text</h2>
                    <button style={buttonStyle} onClick={() => {
                        setIndex(colorIndex + 1);
                        if (colorIndex == 1) {
                            colorRef.current.style.color = "yellow";
                        }
                        else if (colorIndex == 2) {
                            colorRef.current.style.color = "green";
                        }
                        else if (colorIndex == 3) {
                            colorRef.current.style.color = "blue";
                        }
                        else {
                            colorRef.current.style.color = "red";
                            setIndex(1);
                        }
                    }}>
                        Change text color
                    </button>
                </div>
            </div>
        </>
    )
}

export default MyPage;