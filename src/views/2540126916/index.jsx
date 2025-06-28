import React, { useState, useEffect, useRef, useMemo } from "react";
import NimHeader from "./component/nimheader";
import Paragraph from "./component/paragraph";

const MyPage = () => {
    const [clicks, setClicks] = useState(0);
    const inputRef = useRef(null);

    useEffect(() => {
        document.title = `Clicked ${clicks} times`;
    }, [clicks]);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const doubled = useMemo(() => clicks * 2, [clicks]);

    return (
        <div>
            <NimHeader />
            <Paragraph text="lorem ipsum siu siu siu" />
            <p>Additional content can go here.</p>
            <button onClick={() => setClicks(clicks + 1)}>
                Clicked {clicks} times
            </button>
            <p>Doubled: {doubled}</p>
            <br></br>
            <input ref={inputRef} placeholder="KrugLord" />
        </div>
    );
}

export default MyPage;  
