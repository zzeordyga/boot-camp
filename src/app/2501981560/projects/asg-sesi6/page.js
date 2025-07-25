'use client'
import { useState, useEffect, useRef } from 'react';
import '../../2501981560.css';

const AvePage = () => {
    const pengali = Math.floor(Math.random() *5) + 1;
    const [secondsLeft, setSecondsLeft] = useState(pengali * 60);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);


    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isRunning && timerRef.current === null) {
        timerRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
            if (prev === 0) {
                clearInterval(timerRef.current);
                timerRef.current = null;
                setIsRunning(false);
                alert('Congrats! Practice makes perfect!');
                return 0;
            }
            return prev - 1;
            });
        }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
        };
    }, [isRunning]);

    const handlePlay = () => {
        setIsRunning(!isRunning);  
    };

    const handleReset = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setSecondsLeft(pengali * 60);
        setIsRunning(false);
    };

    return (
        <>

        <div style={{display: 'flex', flexDirection : 'column', alignItems: 'center'}}>
            <h1>🌀 Breathehold Excercise Timer</h1>
            <div style={{ fontSize: '56px', margin : '18px 0px' }} >{formatTime(secondsLeft)}</div>

            <div style={{ display : 'flex', gap: '12px', justifyContent:'center' }}>
                <button onClick={handlePlay}>
                    
                    {isRunning === true?
                    <span>&#9208;</span>
                    :
                    <span>&#9654;</span>}
                    
                </button>

                <button onClick={handleReset}>Reset</button>
            </div>
        </div>
    </>
    );
}

export default AvePage;