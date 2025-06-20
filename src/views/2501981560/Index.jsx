import React from 'react';
import './index.css';
import { useState, useEffect, useRef } from 'react';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import * as motion from "motion/react-client"
import { useAnimation} from "framer-motion";

const Index = () => {
    const pengali = Math.floor(Math.random() *5) + 1;
    const [secondsLeft, setSecondsLeft] = useState(pengali * 60);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    // Format seconds into mm:ss
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isRunning && timerRef.current === null) {
        timerRef.current = setInterval(() => {
            setSecondsLeft((prev) => {
            if (prev === 0) {
                clearInterval(timerRef.current);
                timerRef.current = null;
                setIsRunning(false);
                setPlayCount(prev => prev + 1);
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

    const [playCount, setPlayCount] = useState(0);
    const controls = useAnimation();

    const handlePlay = () => {
        controls.start({
            opacity: 1,
            scale: 1,
            transition: {
            duration: pengali*600,
            ease: [0, 0.71, 0.2, 1.01],
            },
        })
        setIsRunning(!isRunning);  
    };

    const handleReset = () => {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setSecondsLeft(pengali * 60);
        setPlayCount(prev => prev + 1);
        setIsRunning(false);
    };

    return (
        <>
            <motion.div
            key={playCount}
            style={styles.ball}
            initial={{ opacity: 0, scale: 0.1 }}
            animate={controls}
            className='fixed inset-0 -z-10 flex items-center justify-center'
            />

        <div className='flex flex-col gap-2.5 justify-center relative z-10 '>
        <h1>🌀 Breathehold Excercise Timer</h1>
        <div className='text-5xl my-5'>{formatTime(secondsLeft)}</div>

        <div className="flex gap-2.5 justify-center">
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

    const styles = {
        ball : {
            width: 1000,
            height: 1000,
            borderRadius: "50%",
            background: "#254FBE",
        },

}

export default Index;