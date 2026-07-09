'use client'
import axios from "axios";
import React, { use, useMemo } from "react";
import { useEffect, useRef, useState } from "react";

function ClaudyaPage() {

    const [images, setImages] = useState([]);
    const [url, setUrl] = useState("https://picsum.photos/v2/list?page=9&limit=6");
    const [message, setMessage] = useState("");
    const inputMessage = useRef(null);
    const popUp = useRef(null);


    const fetchImages = async() => {
        // setUrl("https://picsum.photos/v2/list?page=" + page + "&limit=6");
        const imageData = (await axios.get(url)).data;
        setImages(imageData);
    }

    useEffect(()=>{
        popUp.current.style.display = "none";
        fetchImages();
    }, []);

    const randomIndex = () => {
        var randomNum = Math.random()*20 + 1;
        var page = Math.floor(randomNum);
        console.log(page);
        setUrl("https://picsum.photos/v2/list?page=" + page + "&limit=6");
    }

    useMemo(()=>{
        fetchImages();
    }, [url]);

    const showPopup = () => {
        inputMessage.current.focus();
        const text = inputMessage.current.value;
        popUp.current.style.display = "block";
        setMessage(text);
    }

    const closePopup = () => {
        popUp.current.style.display = "none";
        inputMessage.current.value = "";
    }

    return (
        <div>
            <div style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"stretch"}}>
                <img src="https://picsum.photos/id/176/2500/1662" style={{opacity: "0.3", position: "absolute", top: "0", left: "0", width:"100%", height:"100vh", objectFit:"cover", filter: "blur(4px)"}}/>
                <h1>Hello! I'm <b>Claudya Salim</b>!</h1>
                <h3>My <b>NIM</b> is <b>2502006341</b></h3>
                <p>I am a graduate from <b>Mobile Application and Technology Program</b></p>

                <div>
                    <h3>About My Campus Life</h3>
                    <p>I majored in <b>Mobile Application and Technology</b> during my Bachelor years at BINUS University. Things that I've learned are more specific to mobile app development, but I still get some courses from computer science programs such as Algorithm Programming, Web Programming, Linear Algebra, Data Stuctures, Discrete Mathematics, and other courses. The ones that are specific for my majors are UI/UX Design for Mobile App, Flutter App Development, AR/VR Development with Unity, Android Development (Java based), and iOS Development.</p>
                </div>
            </div>

            <div style={{width: "100%"}}>
                {images.map((image)=>{
                    return <img src={image.download_url} key={image.id} style={{width:"30%", height: "40vh", objectFit:"cover"}}/>
                })}
                <p>Images by <a href="https://picsum.photos/">Lorem Picsum API</a></p>
                <button onClick={randomIndex}>Randomize Images</button>
            </div>
            <br/>
            <br/>
            <b>Send me a message: </b><br/><br/>
            <textarea ref={inputMessage} style={{width: "100%", height: "100px", resize: "none"}}/><br/><br/>
            <button onClick={showPopup}>Send!</button>
            <div ref={popUp} style={{backgroundColor: "rgba(0, 0, 0, 0.8)", position: "fixed", top: "0", left: "0", right: "0", bottom: "0", alignContent: "center"}}>
                <div style={{width: "50%", height: "50%", padding: "4rem", display: "flex", flexDirection: "column", alignItems:"center", justifyContent: "space-between", backgroundColor: "rgba(100, 108, 255, 1)", justifySelf: "center"}}>
                    <h3>Message:</h3>
                    <p>{message}</p>
                    <button onClick={closePopup}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default ClaudyaPage;
